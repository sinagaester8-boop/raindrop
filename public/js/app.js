const products = [
  {id:'h1', name:'Heritage 1', price:35000},
  {id:'h2', name:'Heritage 2', price:35000},
  {id:'h3', name:'Heritage 3', price:35000},
  {id:'pt1', name:'Paket Tebi 1', price:25000},
  {id:'pt2', name:'Paket Tebi 2', price:25000},
  {id:'pt3', name:'Paket Tebi 3', price:25000},
  {id:'pt4', name:'Paket Tebi 4', price:25000},
  {id:'pt5', name:'Paket Tebi 5', price:25000},
  {id:'pt6', name:'Paket Tebi 6', price:25000},
  {id:'pt7', name:'Paket Tebi 7', price:25000},
  {id:'pt8', name:'Paket Tebi 8', price:25000},
  {id:'pi10', name:'Pempek Isi 10', price:30000},
  {id:'pk10', name:'Pempek Krispi 10', price:32000},
  {id:'lenjer', name:'Lenjer Kulit', price:15000},
  {id:'tekwan', name:'Tekwan 500 g', price:28000}
];

const cart = new Map();

const fmt = (n)=> new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR'}).format(n);

function renderProducts(){
  const list = document.getElementById('product-list');
  list.innerHTML='';
  products.forEach(p=>{
    const el = document.createElement('div'); el.className='product';
    el.innerHTML = `
      <h3>${p.name}</h3>
      <div class="price">${fmt(p.price)}</div>
      <div class="controls">
        <input type="number" min="0" value="0" id="qty-${p.id}" />
        <button class="btn" data-id="${p.id}">Add</button>
      </div>
    `;
    list.appendChild(el);
  });

  list.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id = btn.dataset.id;
      const qtyEl = document.getElementById('qty-'+id);
      const qty = parseInt(qtyEl.value)||0;
      if(qty>0){ cart.set(id,(cart.get(id)||0)+qty); qtyEl.value=0; updateCart(); }
    });
  });
}

function updateCart(){
  const container = document.getElementById('cart-items');
  container.innerHTML='';
  if(cart.size===0){ container.textContent='No items yet.'; }
  let subtotal=0;
  for(const [id,qty] of cart.entries()){
    const p = products.find(x=>x.id===id);
    const line = document.createElement('div'); line.className='item';
    line.innerHTML = `<div>${p.name} x ${qty}</div><div>${fmt(p.price*qty)}</div>`;
    container.appendChild(line);
    subtotal += p.price*qty;
  }
  document.getElementById('subtotal').textContent = fmt(subtotal);
  // discount calculation (if voucher applied, stored in data-* on checkout form)
  const voucher = document.getElementById('voucher').value.trim();
  let discount = 0;
  if(voucher.toUpperCase()==='RAINDROP10') discount = Math.round(subtotal * 0.10);
  document.getElementById('discount').textContent = fmt(discount);
  const total = subtotal - discount;
  document.getElementById('total').textContent = fmt(total);
  document.getElementById('final-total').textContent = fmt(total);
}

function setupCheckout(){
  document.getElementById('checkout-btn').addEventListener('click',()=>{
    if(cart.size===0){ alert('Please add at least one product to cart.'); return; }
    document.getElementById('checkout').classList.remove('hidden');
    window.scrollTo({top:document.getElementById('checkout').offsetTop,behavior:'smooth'});
  });

  document.getElementById('back-btn').addEventListener('click',()=>{
    document.getElementById('checkout').classList.add('hidden');
  });

  document.getElementById('voucher').addEventListener('input',()=> updateCart());

  document.getElementById('checkout-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const time = document.getElementById('delivery-time').value;
    const place = document.getElementById('delivery-place').value.trim();
    const voucher = document.getElementById('voucher').value.trim();
    const payment = document.querySelector('input[name=payment]:checked');
    if(!time || !place || !payment){ alert('Please complete delivery info and select payment.'); return; }

    // assemble order
    let subtotal=0; const items=[];
    for(const [id,qty] of cart.entries()){ const p=products.find(x=>x.id===id); subtotal+=p.price*qty; items.push({name:p.name,qty,price:p.price}); }
    let discount = 0; if(voucher.toUpperCase()==='RAINDROP10') discount = Math.round(subtotal*0.10);
    const total = subtotal - discount;

    const order = {items,subtotal,discount,total,delivery:{time,place},payment:payment.value, voucher};

    // show result (no backend) — simulate payment instructions
    const res = document.getElementById('order-result'); res.classList.remove('hidden');
    res.innerHTML = `<h3>Order placed (simulated)</h3>
      <p>Delivery: ${time} — ${place}</p>
      <p>Payment: ${payment.labels?payment.labels[0].innerText:payment.value}</p>
      <p>Total due: <strong>${fmt(total)}</strong></p>
      <p>Please use your selected payment app to transfer the amount. This is a static demo — no real payment is processed.</p>
    `;
    // Clear cart
    cart.clear(); updateCart();
    document.getElementById('checkout-form').reset();
    document.getElementById('checkout').classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  renderProducts(); setupCheckout();
  // wire quantity change to recalc when user edits directly
  document.getElementById('product-list').addEventListener('change',()=>{});
  // update cart when voucher or other changes
  updateCart();
});

# Pempek Raindrop — Static Frontend

This repository contains a minimal static frontend for ordering Pempek (Indonesian food). It's intended to be deployed to Netlify as a static site.

Files added:

- `index.html` — main static page
- `css/styles.css` — basic styles
- `js/app.js` — product list, cart, voucher, and checkout logic (no backend)

How to run locally

1. Serve the directory using a simple static server (Python 3):

```bash
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Deploy to Netlify

Option A — Drag & Drop:

1. Build the repository as a ZIP (or just open the project folder) and go to https://app.netlify.com/drop
2. Drag the folder contents (the `index.html`, `css/`, `js/`) into the Netlify drop area. Netlify will host it as a static site.

Option B — Connect Git repository:

1. Push this repository to GitHub (or GitLab) and connect your repo in Netlify.
2. Netlify will try to publish from a directory configured in the site's settings. This project includes a `netlify.toml` which sets the publish directory to `public` and the site files have been moved into `public/`. If your Netlify site was previously configured to use a different folder, open your site settings and set the "Publish directory" to `public` or clear any override so `netlify.toml` is used.

If you prefer, you can also set the publish directory in the Netlify UI:

```text
Publish directory: public
Build command: (leave empty)
```

Notes

- This is a demo static front end. The "Place Order" action is simulated and does not send orders to a backend or process real payments.
- Voucher: use code `RAINDROP10` to simulate 10% discount.

Next steps (suggestions)

- Add images for products and richer styling.
- Connect to a serverless function or a proper backend to accept orders.
- Integrate a real payment gateway or create QR payment instructions.

# gripfeet-active

Second theme design for [Gripfeet](https://gripfeet.in) — Premium Grip Socks, Made in India.

## Design System

- **Type:** Instrument Serif (display) + Hanken Grotesk (body) + JetBrains Mono (labels)
- **Palette:** Monochrome foundation — `#FFFFFF` / `#F7F7F5` / `#0A0A0A` / `#6B6B6B`, one restrained taupe accent `#C9B9A3`
- **Feel:** Editorial, gallery-like, premium, clean, modern — "quietly premium"

## Project Structure

```
├── Gripfeet.html          — Homepage prototype (desktop + mobile responsive)
├── PDP.html               — Product Detail Page prototype
├── Gripfeet Mobile.html   — iOS-framed mobile preview (homepage + PDP)
├── app.jsx                — Homepage app shell
├── pdp-app.jsx            — PDP app shell
├── data.jsx               — Catalogue data, icon set, palette
├── styles.css             — Design system CSS
├── components/
│   ├── header.jsx
│   ├── hero.jsx
│   ├── products.jsx
│   └── sections.jsx
├── assets/
│   └── gripfeet-logo-cropped.png
└── uploads/               — Brand assets
```

## Running the Prototype Locally

Open `Gripfeet.html` directly in a browser. Uses CDN-loaded React 18 + Babel standalone — no build step required.

For the PDP: open `PDP.html`. Accepts `?product=<id>` query param (default: `ank-soft-studio`).

## Shopify Integration

This prototype will be converted to a Shopify theme for native deployment. The component structure maps directly to Shopify sections/snippets.

| Prototype Component | Shopify Equivalent |
|---|---|
| `components/header.jsx` | `sections/header.liquid` |
| `components/hero.jsx` | `sections/hero.liquid` |
| `components/products.jsx` | `sections/featured-collection.liquid` |
| `components/sections.jsx` | Multiple sections |
| `data.jsx` | `config/settings_data.json` + metafields |
| `styles.css` | `assets/base.css` |

## Product Catalogue

4 ranges · 11 SKUs · Stretch Supima Yarn · Made in India

| Range | Line | Pack | Price |
|---|---|---|---|
| Crew | Active Hold | Set of 2 | ₹699 |
| Ankle | Mat Masters | Set of 3 | ₹699 |
| Loafer | Invisible Grip | Set of 3 | ₹599 |
| Kids | Lil Steps | Set of 3 | ₹399 |

See `gripfeet_shopify_products.csv` for full Shopify product import CSV.

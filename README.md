# gripfeet-active

Second theme design for [Gripfeet](https://gripfeet.in) — Premium Grip Socks, Made in India.

## Design System

- **Type:** Hanken Grotesk 800 weight throughout + JetBrains Mono for labels — no serif
- **Palette:** White + warm cream (`#F3F0E8`) cards, near-black `#0E0E0E`, athletic accent (default blue `#2E64E0` — switchable to lime, red, navy via Tweaks)
- **Feel:** Bold, athletic, modern — pill buttons, carousel tabs, heavy type, grip-dot footer texture

## Project Structure

```
├── Gripfeet.html          — Homepage prototype (desktop + mobile responsive)
├── Collection.html        — Collection / PLP page prototype
├── PDP.html               — Product Detail Page prototype
├── app.jsx                — Homepage app shell
├── collection-app.jsx     — Collection page app shell
├── pdp-app.jsx            — PDP app shell
├── data.jsx               — Catalogue data, icon set, palette
├── styles.css             — Core tokens, type, nav, hero, buttons
├── sections.css           — Section components (carousel, cards, bundles, footer)
├── pdp.css                — PDP-specific styles
├── collection.css         — Collection/PLP styles
├── components/
│   ├── header.jsx         — Announcement bar, sticky nav, mobile drawer
│   ├── hero.jsx           — Hero, Trust strip, Statement, Move band
│   ├── products.jsx       — Product carousel, quick-view modal, cart drawer
│   ├── sections.jsx       — Story, USPs, Palette, Bundles, Reviews, Footer
│   └── collection.jsx     — Collection grid + filter sidebar
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

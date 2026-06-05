// Gripfeet — shared data + tiny icon set (inline SVG)
// Updated to match the production catalogue (May 2026).

const Icon = ({ name, size = 16, sw = 1.5 }) => {
  const common = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor", strokeWidth: sw,
    strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "search":    return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "user":      return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>;
    case "bag":       return <svg {...common}><path d="M5 7h14l-1.2 13a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7Z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>;
    case "heart":     return <svg {...common}><path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10Z"/></svg>;
    case "arrow":     return <svg {...common}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>;
    case "arrow-up":  return <svg {...common}><path d="M5 19 19 5"/><path d="M9 5h10v10"/></svg>;
    case "plus":      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "minus":     return <svg {...common}><path d="M5 12h14"/></svg>;
    case "close":     return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case "menu":      return <svg {...common}><path d="M3 7h18M3 17h18"/></svg>;
    case "check":     return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case "leaf":      return <svg {...common}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z"/><path d="M5 19c4-4 8-6 14-14"/></svg>;
    case "grip":      return <svg {...common}><circle cx="7" cy="7" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="17" cy="7" r="1"/><circle cx="7" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="17" cy="12" r="1"/><circle cx="7" cy="17" r="1"/><circle cx="12" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg>;
    case "india":     return <svg {...common}><path d="M12 3c-3.5 0-6 2.5-6 6 0 4 6 12 6 12s6-8 6-12c0-3.5-2.5-6-6-6Z"/><circle cx="12" cy="9" r="2"/></svg>;
    case "lifestyle": return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></svg>;
    case "fit":       return <svg {...common}><path d="M4 7h16M4 12h16M4 17h10"/></svg>;
    case "washer":    return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13" r="5"/><circle cx="8" cy="6" r=".5" fill="currentColor"/></svg>;
    case "wa":        return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.6 11.6 0 0 0 4 19.7L3 23l3.4-1A11.6 11.6 0 1 0 20.5 3.5Zm-8.5 18a9.5 9.5 0 0 1-4.8-1.3l-.3-.2-2 .6.6-2-.2-.3A9.5 9.5 0 1 1 12 21.5Zm5.4-7c-.3-.2-1.7-.9-2-1s-.5-.1-.6.2-.7.9-.8 1.1-.3.2-.5.1a7.8 7.8 0 0 1-3.9-3.4c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.8.4 3 3 0 0 0-1 2.3c0 1.4 1 2.7 1.1 2.9s2 3.2 5 4.5c1.8.8 2.5.8 3.4.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z"/></svg>;
    case "ig":        return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/></svg>;
    case "pin":       return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M9 18c1-3 1-7 2-10s2-2 3-1-1 5 0 6 3-1 3-3a6 6 0 0 0-11-3"/></svg>;
    case "tt":        return <svg {...common}><path d="M16 4v9a4 4 0 1 1-4-4"/><path d="M16 4c.5 2.5 2 4 4.5 4"/></svg>;
    case "gift":      return <svg {...common}><rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 13h18"/><path d="M12 9v11"/><path d="M8 9a3 3 0 0 1 0-6c2 0 4 3 4 6"/><path d="M16 9a3 3 0 0 0 0-6c-2 0-4 3-4 6"/></svg>;
    case "repeat":    return <svg {...common}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 20v-4h4"/></svg>;
    case "shield":    return <svg {...common}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "globe":     return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18"/></svg>;
    case "truck":     return <svg {...common}><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
    default: return null;
  }
};

// ----- striped placeholder helper -----
const Placeholder = ({ label, code, className = "", style }) => (
  <div className={`ph ${className}`} style={style}>
    <span className="ph-label">[ {label} ]</span>
    <span className="ph-corner">{code || ""}</span>
  </div>
);

// ============================================================
// CATALOGUE (May 2026)
// 4 ranges · 11 SKUs · Stretch Supima yarn · Made in India
// ============================================================

// Signature palette swatches (used in pickers + chips)
const PALETTE = {
  // Core Neutrals
  white:      { hex: "#FFFFFF", label: "White",        ring: "#E5E5E3" },
  black:      { hex: "#0A0A0A", label: "Black",        ring: "rgba(255,255,255,0.18)" },
  warmBeige:  { hex: "#D9C9B3", label: "Warm Beige",   ring: "#C9B59A" },
  grey:       { hex: "#A9ACA9", label: "Grey",         ring: "#8A8E8A" },
  dustyBrown: { hex: "#7A6A57", label: "Dusty Brown",  ring: "#5E5040" },
  // Soft Pastels
  sage:       { hex: "#B6C5A8", label: "Sage",         ring: "#9CB28C" },
  lavender:   { hex: "#C7B9D8", label: "Lavender",     ring: "#A998C0" },
  butter:     { hex: "#F1E2A6", label: "Butter Yellow",ring: "#DBC97F" },
  mint:       { hex: "#BFE0CE", label: "Mint",         ring: "#9DCDB3" },
  iceBlue:    { hex: "#C6D9E2", label: "Ice Blue",     ring: "#A4C0CD" },
  pink:       { hex: "#F1C9CF", label: "Pink",         ring: "#E0A8B0" },
  // Heritage Sport Tones
  red:        { hex: "#9E2A2A", label: "Red",          ring: "#7A1F1F" },
  navy:       { hex: "#1E2E4F", label: "Navy",         ring: "#13203A" },
  deepGrey:   { hex: "#3A3D3F", label: "Deep Grey",    ring: "#26282A" },
  // Misc tones
  cream:      { hex: "#F2EBDF", label: "Cream",        ring: "#DCD3C2" },
  blushPink:  { hex: "#E9C6C6", label: "Blush Pink",   ring: "#D2A3A3" },
};

// Helper: turn a list of palette keys into the array of hex chips
const chips = (...keys) => keys.map(k => PALETTE[k].hex);

const PRODUCTS = [
  // ---- CREW · ACTIVE HOLD · Set of 2 ----
  {
    id: "crew-court-classics",
    name: "Court Classics",
    range: "Crew · Active Hold",
    line: "Performance grip for movement & training",
    pack: "Set of 2 Pairs",
    code: "GF-CRW-01",
    swatches: chips("white", "black"),
    colorNote: "White & Black",
    price: 699, was: 999,
    blurb: "Twin-stripe heritage crew. Court-shaped cuff, mid-density silicone grip tuned for fast lateral movement.",
    rangeId: "crew",
  },
  {
    id: "crew-varsity",
    name: "Varsity Pack",
    range: "Crew · Active Hold",
    line: "Performance grip for movement & training",
    pack: "Set of 2 Pairs",
    code: "GF-CRW-02",
    swatches: chips("red", "navy"),
    colorNote: "Red & Navy",
    price: 699, was: 999,
    blurb: "Heritage sport tones. Reinforced heel, ribbed cuff, full silicone sole for football and gym sessions.",
    rangeId: "crew",
  },

  // ---- ANKLE · MAT MASTERS · Set of 3 ----
  {
    id: "ank-essential-neutrals",
    name: "Essential Neutrals",
    range: "Ankle · Mat Masters",
    line: "Comfort-first grip for studio & daily wear",
    pack: "Set of 3 Pairs",
    code: "GF-ANK-01",
    swatches: chips("white", "warmBeige", "grey"),
    colorNote: "White · Warm Beige · Grey",
    price: 699, was: 999,
    blurb: "The wardrobe trio. Soft Supima ankle with full silicone grip for Pilates, yoga, barre & hardwood mornings.",
    rangeId: "ankle",
  },
  {
    id: "ank-soft-studio",
    name: "Soft Studio",
    range: "Ankle · Mat Masters",
    line: "Comfort-first grip for studio & daily wear",
    pack: "Set of 3 Pairs",
    code: "GF-ANK-02",
    swatches: chips("warmBeige", "sage", "lavender"),
    colorNote: "Warm Beige · Sage · Lavender",
    price: 699, was: 999,
    blurb: "Calm tonal three-pack with a twin-stripe cuff. Studio-ready, picnic-ready, sofa-ready.",
    rangeId: "ankle",
  },
  {
    id: "ank-fresh-pastels",
    name: "Fresh Pastels",
    range: "Ankle · Mat Masters",
    line: "Comfort-first grip for studio & daily wear",
    pack: "Set of 3 Pairs",
    code: "GF-ANK-03",
    swatches: chips("butter", "mint", "iceBlue"),
    colorNote: "Butter Yellow · Mint · Ice Blue",
    price: 699, was: 999,
    blurb: "A spring palette done quietly. Higher-cushion footbed, breathable knit, full silicone sole.",
    rangeId: "ankle",
  },

  // ---- LOAFER · INVISIBLE GRIP · Set of 3 ----
  {
    id: "lof-bare-neutrals",
    name: "Bare Neutrals",
    range: "Loafer · Invisible Grip",
    line: "Invisible comfort with secure all-day grip",
    pack: "Set of 3 Pairs",
    code: "GF-LOF-01",
    swatches: chips("warmBeige", "grey", "dustyBrown"),
    colorNote: "Warm Beige · Grey · Dusty Brown",
    price: 599, was: 899,
    blurb: "Hidden under loafers and sneakers. Silicone heel grip stops the slip-down, three skin-true tones.",
    rangeId: "loafer",
  },
  {
    id: "lof-dark-essentials",
    name: "Dark Essentials",
    range: "Loafer · Invisible Grip",
    line: "Invisible comfort with secure all-day grip",
    pack: "Set of 3 Pairs",
    code: "GF-LOF-02",
    swatches: chips("black", "deepGrey", "navy"),
    colorNote: "Black · Deep Grey · Navy",
    price: 599, was: 899,
    blurb: "Tailored-shoe trio. Disappears under dress shoes, holds the heel in place all day.",
    rangeId: "loafer",
  },
  {
    id: "lof-soft-luxe",
    name: "Soft Luxe",
    range: "Loafer · Invisible Grip",
    line: "Invisible comfort with secure all-day grip",
    pack: "Set of 3 Pairs",
    code: "GF-LOF-03",
    swatches: chips("lavender", "blushPink", "sage"),
    colorNote: "Lavender · Blush Pink · Sage",
    price: 599, was: 899,
    blurb: "A softer no-show palette. Hidden grip, scalloped low-cut, silicone heel.",
    rangeId: "loafer",
  },

  // ---- KIDS · LIL STEPS · Set of 3 ----
  {
    id: "kid-classic-stripe",
    name: "Classic Stripe",
    range: "Kids · Lil Steps",
    line: "Safe grip socks for little everyday adventures",
    pack: "Set of 3 Pairs",
    code: "GF-KID-01",
    swatches: chips("white", "red", "navy"),
    colorNote: "White · Red · Navy",
    price: 399, was: 699,
    blurb: "Striped kids ankle. Full silicone sole for hardwood, marble and tile. Ages 0–5.",
    rangeId: "kids",
  },
  {
    id: "kid-play-pastels",
    name: "Play Pastels",
    range: "Kids · Lil Steps",
    line: "Safe grip socks for little everyday adventures",
    pack: "Set of 3 Pairs",
    code: "GF-KID-02",
    swatches: chips("butter", "mint", "iceBlue"),
    colorNote: "Butter Yellow · Mint · Ice Blue",
    price: 399, was: 699,
    blurb: "A first-steps palette in soft Supima. Stretchy ankle, secure full-sole grip.",
    rangeId: "kids",
  },
  {
    id: "kid-soft-candy",
    name: "Soft Candy",
    range: "Kids · Lil Steps",
    line: "Safe grip socks for little everyday adventures",
    pack: "Set of 3 Pairs",
    code: "GF-KID-03",
    swatches: chips("lavender", "cream", "pink"),
    colorNote: "Lavender · Cream · Pink",
    price: 399, was: 699,
    blurb: "Sweetened pastels for the nursery shelf. Knit soft enough for the smallest feet.",
    rangeId: "kids",
  },
];

// Featured row = one hero SKU from each range
const FEATURED = [
  "ank-soft-studio",
  "crew-court-classics",
  "lof-bare-neutrals",
  "kid-classic-stripe",
].map(id => PRODUCTS.find(p => p.id === id));

// ----- Categories (4 ranges) -----
const CATEGORIES = [
  {
    id: "ankle",  code: "01", cuff: "Ankle",  line: "Mat Masters",
    desc: "Comfort-first grip socks for Pilates, yoga, barre & daily studio wear.",
    pack: "Set of 3 Pairs · from ₹699",
    span: 6, badge: "Bestseller",
    tone: "#EFEEEA",
  },
  {
    id: "crew",   code: "02", cuff: "Crew",   line: "Active Hold",
    desc: "Performance grip for movement & training. Football, gym, run.",
    pack: "Set of 2 Pairs · from ₹699",
    span: 6,
    tone: "#1a1a1a", darkPh: true,
  },
  {
    id: "loafer", code: "03", cuff: "Loafer", line: "Invisible Grip",
    desc: "Invisible comfort with secure all-day grip. Disappears under loafers & sneakers.",
    pack: "Set of 3 Pairs · from ₹599",
    span: 4,
    tone: "#EFEEEA",
  },
  {
    id: "kids",   code: "04", cuff: "Kids",   line: "Lil Steps",
    desc: "Safe grip socks for little everyday adventures. Ages 0–5.",
    pack: "Set of 3 Pairs · from ₹399",
    span: 4,
    tone: "#F2EBDF",
  },
  // Coming-soon teaser stays as the lifestyle / journal card
  {
    id: "journal", code: "05", cuff: "Journal", line: "On The Mat",
    desc: "Stories from the studio, hardwood mornings, long flights and slow Sundays.",
    pack: "Editorial · Updated weekly",
    span: 4, badge: "Coming Soon", dark: true,
    tone: "#0A0A0A", darkPh: true,
  },
];

// ----- Reviews -----
const REVIEWS = [
  {
    stars: 5,
    quote: "Honestly the first grip sock I haven't been embarrassed to wear out of the studio. The Supima feels like a proper sock — not a piece of medical equipment.",
    name: "Aanya M.",
    loc: "Mumbai · Pilates instructor",
  },
  {
    stars: 5,
    quote: "Bought a three-pack of Soft Studio for travel. Hotel floors, long-haul flights, AirBnB tiles — they just work. And they look good.",
    name: "Rohan K.",
    loc: "Bengaluru · Frequent traveller",
  },
  {
    stars: 5,
    quote: "My toddler runs across our marble like it's a track. Finally — a kids' grip sock that fits properly and doesn't slide off her ankle every two minutes.",
    name: "Priya & Ishaan",
    loc: "Delhi · Lil Steps customer",
  },
];

// ----- "Our Promise" (catalogue copy + one extra) -----
const PROMISES = [
  { ico: "leaf",   t: "Stretch Supima Yarn",   d: "Soft, breathable & durable. Long-staple cotton that softens with every wash." },
  { ico: "grip",   t: "Superior Antislip Grip",d: "100% silicone, full-sole pattern. Extra stability on any surface — studio, hardwood, marble, tile." },
  { ico: "fit",    t: "Perfect Fit",           d: "Available in 2–3 sizes for a better fit. Reinforced heel, ribbed cuff, no slip-down." },
  { ico: "washer", t: "Easy Care",             d: "Machine washable & long-lasting. Knit and finished in India for the long run." },
];

// ----- Bundles -----
const BUNDLES = [
  {
    tag: "Starter",
    name: "Studio Pair",
    price: 699, was: 999,
    save: "Save 30%",
    desc: "One pack from the Ankle or Crew range.",
    list: ["Set of 2 or 3 pairs", "Any colour story", "Free shipping over ₹999"],
    cta: "Pick a pack",
    featured: false,
  },
  {
    tag: "Most Popular",
    name: "House Two",
    price: 1199, was: 1898,
    save: "Save 37%",
    desc: "Two Ankle three-packs. Six pairs.",
    list: ["Six pairs total", "Mix two colour stories", "Free shipping anywhere", "Gripfeet linen pouch included"],
    cta: "Build the two",
    featured: true,
  },
  {
    tag: "Household",
    name: "Family Four",
    price: 2199, was: 3596,
    save: "Save 39%",
    desc: "One pack from every range.",
    list: ["Ankle · Crew · Loafer · Lil Steps", "Eleven pairs in total", "Free shipping anywhere", "COD available"],
    cta: "Build the family",
    featured: false,
  },
];

Object.assign(window, {
  Icon, Placeholder,
  PRODUCTS, FEATURED, CATEGORIES, REVIEWS, PROMISES, BUNDLES, PALETTE,
});

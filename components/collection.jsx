// Gripfeet ACTIVE — Collection (shop-all) page: filter rail, sort, product grid, mobile filter sheet

// ---- facet config ----
const RANGE_OPTS = [
  { id: "ankle",  label: "Ankle · Mat Masters" },
  { id: "crew",   label: "Crew · Active Hold" },
  { id: "loafer", label: "Loafer · Invisible Grip" },
  { id: "kids",   label: "Kids · Lil Steps" },
];
const COLOUR_OPTS = [
  { id: "neutrals", label: "Neutrals" },
  { id: "pastels",  label: "Soft Pastels" },
  { id: "heritage", label: "Heritage Tones" },
];
const PACK_OPTS = [
  { id: "2", label: "Set of 2 pairs" },
  { id: "3", label: "Set of 3 pairs" },
];
const PRICE_OPTS = [
  { id: "u500", label: "Under ₹500",  test: (p) => p.price < 500 },
  { id: "5-6",  label: "₹500 – ₹650", test: (p) => p.price >= 500 && p.price <= 650 },
  { id: "650+", label: "₹650 & up",   test: (p) => p.price > 650 },
];
const SORT_OPTS = [
  { id: "featured",   label: "Featured" },
  { id: "price-asc",  label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating",     label: "Top rated" },
  { id: "reviews",    label: "Most reviewed" },
];

const COLOUR_FAMILY = {
  neutrals: ["white", "black", "warmBeige", "grey", "dustyBrown", "deepGrey", "cream"],
  pastels:  ["sage", "lavender", "butter", "mint", "iceBlue", "pink", "blushPink"],
  heritage: ["red", "navy"],
};
// hex -> family lookup
const HEX_FAMILY = (() => {
  const map = {};
  Object.entries(COLOUR_FAMILY).forEach(([fam, keys]) => {
    keys.forEach((k) => { if (PALETTE[k]) map[PALETTE[k].hex.toUpperCase()] = fam; });
  });
  return map;
})();
const productFamilies = (p) => {
  const fams = new Set();
  p.swatches.forEach((hex) => { const f = HEX_FAMILY[hex.toUpperCase()]; if (f) fams.add(f); });
  return fams;
};
const packSize = (p) => (/2/.test(p.pack) ? "2" : "3");

// ---- small checkbox row ----
const FacetRow = ({ checked, label, count, onToggle }) => (
  <button className={`facet ${checked ? "on" : ""}`} onClick={onToggle} role="checkbox" aria-checked={checked}>
    <span className="box"><Icon name="check" size={12} sw={2} /></span>
    <span className="flab">{label}</span>
    {count != null && <span className="fcount">{count}</span>}
  </button>
);

const FilterGroup = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className={`filter-group ${open ? "open" : ""}`}>
      <button className="fg-head" onClick={() => setOpen((o) => !o)}>
        {title}<span className="fg-ico"><Icon name={open ? "minus" : "plus"} size={15} sw={1.6} /></span>
      </button>
      <div className="fg-body">{children}</div>
    </div>
  );
};

// ---- the filter controls (shared by rail + drawer) ----
const FilterControls = ({ state, set, counts }) => {
  const toggleSet = (key, id) => set((s) => {
    const next = new Set(s[key]);
    next.has(id) ? next.delete(id) : next.add(id);
    return { ...s, [key]: next };
  });
  return (
    <>
      <FilterGroup title="Range">
        {RANGE_OPTS.map((o) => (
          <FacetRow key={o.id} label={o.label} count={counts.range[o.id] || 0}
            checked={state.ranges.has(o.id)} onToggle={() => toggleSet("ranges", o.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Colour">
        {COLOUR_OPTS.map((o) => (
          <FacetRow key={o.id} label={o.label} count={counts.colour[o.id] || 0}
            checked={state.colours.has(o.id)} onToggle={() => toggleSet("colours", o.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Pack">
        {PACK_OPTS.map((o) => (
          <FacetRow key={o.id} label={o.label} count={counts.pack[o.id] || 0}
            checked={state.packs.has(o.id)} onToggle={() => toggleSet("packs", o.id)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Price">
        {PRICE_OPTS.map((o) => (
          <FacetRow key={o.id} label={o.label} count={counts.price[o.id] || 0}
            checked={state.prices.has(o.id)} onToggle={() => toggleSet("prices", o.id)} />
        ))}
      </FilterGroup>
    </>
  );
};

const Collection = ({ onAdd }) => {
  const params = new URLSearchParams(window.location.search);
  const preRange = params.get("range");

  const [state, setState] = React.useState({
    ranges: new Set(preRange && RANGE_OPTS.some((r) => r.id === preRange) ? [preRange] : []),
    colours: new Set(),
    packs: new Set(),
    prices: new Set(),
  });
  const [sort, setSort] = React.useState("featured");
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle("no-scroll-sheet", sheetOpen);
  }, [sheetOpen]);

  // counts per facet (computed against full catalogue, independent of selection)
  const counts = React.useMemo(() => {
    const c = { range: {}, colour: {}, pack: {}, price: {} };
    PRODUCTS.forEach((p) => {
      c.range[p.rangeId] = (c.range[p.rangeId] || 0) + 1;
      productFamilies(p).forEach((f) => { c.colour[f] = (c.colour[f] || 0) + 1; });
      const ps = packSize(p); c.pack[ps] = (c.pack[ps] || 0) + 1;
      PRICE_OPTS.forEach((o) => { if (o.test(p)) c.price[o.id] = (c.price[o.id] || 0) + 1; });
    });
    return c;
  }, []);

  const filtered = React.useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (state.ranges.size && !state.ranges.has(p.rangeId)) return false;
      if (state.colours.size) {
        const fams = productFamilies(p);
        if (![...state.colours].some((f) => fams.has(f))) return false;
      }
      if (state.packs.size && !state.packs.has(packSize(p))) return false;
      if (state.prices.size) {
        const ok = PRICE_OPTS.filter((o) => state.prices.has(o.id)).some((o) => o.test(p));
        if (!ok) return false;
      }
      return true;
    });
    const by = {
      "price-asc":  (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "rating":     (a, b) => b.rating - a.rating,
      "reviews":    (a, b) => b.reviews - a.reviews,
      "featured":   () => 0,
    }[sort];
    return [...list].sort(by);
  }, [state, sort]);

  const activeChips = [
    ...[...state.ranges].map((id) => ({ key: "ranges", id, label: RANGE_OPTS.find((o) => o.id === id)?.label })),
    ...[...state.colours].map((id) => ({ key: "colours", id, label: COLOUR_OPTS.find((o) => o.id === id)?.label })),
    ...[...state.packs].map((id) => ({ key: "packs", id, label: PACK_OPTS.find((o) => o.id === id)?.label })),
    ...[...state.prices].map((id) => ({ key: "prices", id, label: PRICE_OPTS.find((o) => o.id === id)?.label })),
  ];
  const removeChip = (key, id) => setState((s) => { const n = new Set(s[key]); n.delete(id); return { ...s, [key]: n }; });
  const clearAll = () => setState({ ranges: new Set(), colours: new Set(), packs: new Set(), prices: new Set() });

  const heading = preRange && state.ranges.size === 1
    ? RANGE_OPTS.find((o) => o.id === preRange)?.label.split(" · ")[0] + " socks"
    : "All grip socks";
  const intro = {
    ankle:  "Comfort-first grip for Pilates, yoga, barre & daily studio wear.",
    crew:   "Performance grip for movement & training — football, gym, run.",
    loafer: "Invisible comfort with secure all-day grip under loafers & sneakers.",
    kids:   "Safe grip socks for little everyday adventures. Ages 0–5.",
  }[preRange] || "Every range, every height — Supima up top, 100% silicone on the sole. Knit in India, worn everywhere.";

  return (
    <>
      <div className="wrap col-breadcrumb">
        <a href="Gripfeet.html">Home</a><span className="sep">/</span>
        <span className="here">{heading}</span>
      </div>

      <header className="wrap col-head" data-screen-label="Collection · Header">
        <div>
          <span className="eyebrow"><span className="dot"></span>Shop · {filtered.length} {filtered.length === 1 ? "style" : "styles"}</span>
          <h1 className="col-title">{heading}</h1>
        </div>
        <p className="col-intro">{intro}</p>
      </header>

      <div className="wrap col-layout">
        <aside className="col-rail" aria-label="Filters">
          <div className="rail-head">
            <span>Filters</span>
            {activeChips.length > 0 && <button className="rail-clear" onClick={clearAll}>Clear all</button>}
          </div>
          <FilterControls state={state} set={setState} counts={counts} />
        </aside>

        <div className="col-main">
          <div className="col-toolbar">
            <button className="filter-trigger" onClick={() => setSheetOpen(true)}>
              <Icon name="sliders" size={16} sw={1.6} /> Filter
              {activeChips.length > 0 && <span className="ft-badge">{activeChips.length}</span>}
            </button>
            <div className="col-count">{filtered.length} {filtered.length === 1 ? "product" : "products"}</div>
            <label className="col-sort">
              <span>Sort</span>
              <div className="sort-select">
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  {SORT_OPTS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
                <Icon name="chev" size={15} sw={1.6} />
              </div>
            </label>
          </div>

          {activeChips.length > 0 && (
            <div className="active-chips">
              {activeChips.map((c) => (
                <button key={c.key + c.id} className="chip" onClick={() => removeChip(c.key, c.id)}>
                  {c.label}<Icon name="close" size={12} sw={1.8} />
                </button>
              ))}
              <button className="chip chip-clear" onClick={clearAll}>Clear all</button>
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="col-empty">
              <span className="ic"><Icon name="search" size={22} /></span>
              <h3>No socks match those filters.</h3>
              <p>Try loosening a filter or two.</p>
              <button className="btn btn-primary" onClick={clearAll}>Clear filters <Icon name="arrow" size={14} /></button>
            </div>
          ) : (
            <div className="col-grid">
              {filtered.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
            </div>
          )}

          <div className="col-foot">Showing all {filtered.length} of {PRODUCTS.length} grip-sock styles · more colourways landing soon.</div>
        </div>
      </div>

      {/* mobile filter sheet */}
      <div className={`sheet-bg ${sheetOpen ? "open" : ""}`} onClick={() => setSheetOpen(false)}></div>
      <div className={`filter-sheet ${sheetOpen ? "open" : ""}`} aria-hidden={!sheetOpen}>
        <div className="sheet-head">
          <span className="title">Filter &amp; sort</span>
          <button className="icon-btn" onClick={() => setSheetOpen(false)} aria-label="Close"><Icon name="close" size={20} /></button>
        </div>
        <div className="sheet-body">
          <FilterGroup title="Sort by" defaultOpen={true}>
            <div className="sheet-sort">
              {SORT_OPTS.map((o) => (
                <button key={o.id} className={`sheet-sort-opt ${sort === o.id ? "on" : ""}`} onClick={() => setSort(o.id)}>
                  {o.label}<span className="radio"></span>
                </button>
              ))}
            </div>
          </FilterGroup>
          <FilterControls state={state} set={setState} counts={counts} />
        </div>
        <div className="sheet-foot">
          <button className="btn btn-outline" onClick={clearAll}>Clear</button>
          <button className="btn btn-primary" onClick={() => setSheetOpen(false)}>Show {filtered.length} {filtered.length === 1 ? "result" : "results"}</button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { Collection });

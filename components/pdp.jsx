// Gripfeet ACTIVE — Product Detail Page component
// Reads ?product=<id> from URL; defaults to Soft Studio.

const PDP = ({ product, onAdd }) => {
  const [activeColor, setActiveColor] = React.useState(product.swatches[0]);
  const [size, setSize] = React.useState("M");
  const [qty, setQty] = React.useState(1);
  const [pack, setPack] = React.useState("p3");
  const [shot, setShot] = React.useState(0);
  const [open, setOpen] = React.useState(["materials"]);
  const [showBar, setShowBar] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 620);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phTone = product.id.startsWith("crew") ? "#16160F"
               : product.id.startsWith("kid")  ? "#F2EBDF" : "#EFEEEA";
  const phDark = product.id.startsWith("crew");

  // ---- tiered pack pricing (per-pair base by range) ----
  const SINGLE_PRICE = { crew: 349, ankle: 279, loafer: 239, kids: 159 };
  const unit = SINGLE_PRICE[product.rangeId] || 299;
  const r5 = (n) => Math.round(n / 5) * 5;
  const PACKS = [
    { id: "single", label: "Single",    pairs: 1, sub: "1 pair",  price: unit,                  was: r5(unit * 1.35) },
    { id: "p3",     label: "Pack of 3", pairs: 3, sub: "3 pairs", price: r5(unit * 3 * 0.83),    was: unit * 3, badge: "Save 17%" },
    { id: "p6",     label: "Pack of 6", pairs: 6, sub: "6 pairs", price: r5(unit * 6 * 0.70),    was: unit * 6, badge: "Best value" },
  ];
  const activePack = PACKS.find((p) => p.id === pack) || PACKS[1];
  const price = activePack.price;
  const off = Math.round((1 - activePack.price / activePack.was) * 100);

  const shots = [
    { label: `${product.name} · pair · lay-flat`, code: `${product.code} · 01` },
    { label: "Detail · silicone grip pattern",    code: `${product.code} · 02` },
    { label: "On-foot · studio shot",             code: `${product.code} · 03` },
    { label: "Lifestyle · folded stack",          code: `${product.code} · 04` },
    { label: "Packaging · card sleeve",           code: `${product.code} · 05` },
  ];

  const colorLabels = product.swatches.map((hex) => {
    const k = Object.values(PALETTE).find((p) => p.hex.toUpperCase() === hex.toUpperCase());
    return k ? k.label : "—";
  });
  const activeColorLabel = colorLabels[product.swatches.indexOf(activeColor)] || colorLabels[0];

  const accordion = [
    { id: "materials", title: "Materials & Make", body: (
      <>
        <p>72% Stretch Supima cotton · 24% recycled nylon · 4% elastane. 100% food-grade silicone grip pattern on the full sole. Reinforced heel &amp; toe.</p>
        <ul>
          <li>Long-staple Supima for softness and durability</li>
          <li>Full-sole silicone — not painted-on rubber</li>
          <li>Ribbed cuff for a secure, no-slip-down fit</li>
        </ul>
      </>
    )},
    { id: "size", title: "Sizing & Fit", body: (
      <p>Available in 2–3 sizes so most feet land in the middle of the band. UK 3–6 (S), 6–9 (M), 9–12 (L). Wears slightly snug out of the wash — softens after first wear.</p>
    )},
    { id: "care", title: "Care & Washing", body: (
      <p>Machine washable, cold cycle, inside out. Tumble dry low or air dry. Do not iron the silicone sole. The pair will last 80+ wears with normal care.</p>
    )},
    { id: "ship", title: "Shipping & Returns", body: (
      <p>Ships globally, 4–7 day delivery. Free shipping over ₹999. COD available across India. All sales are final, with a quality guarantee — if anything's wrong with the make, we replace it.</p>
    )},
  ];
  const toggle = (id) => setOpen((o) => o.includes(id) ? o.filter((x) => x !== id) : [...o, id]);

  const related = PRODUCTS
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.rangeId === product.rangeId ? -1 : 1) - (b.rangeId === product.rangeId ? -1 : 1))
    .slice(0, 4);

  const add = () => onAdd && onAdd(product, { size, qty, price: activePack.price, packLabel: activePack.label, pairs: activePack.pairs, colour: pack === "single" ? activeColorLabel : product.colorNote });

  return (
    <>
      <div className="wrap pdp-breadcrumb">
        <a href="Gripfeet.html">Home</a><span className="sep">/</span>
        <a href={`Collection.html?range=${product.rangeId}`}>{product.range.split(" · ")[0]}</a><span className="sep">/</span>
        <span className="here">{product.name}</span>
      </div>

      <section className="wrap pdp" data-screen-label="PDP · Hero">
        <div className="pdp-gallery">
          <div className="pdp-thumbs">
            {shots.map((s, i) => (
              <button key={i} className={`pdp-thumb ${shot === i ? "active" : ""}`} onClick={() => setShot(i)} aria-label={`View ${i + 1}`}>
                <div className={`ph ${phDark ? "ph-dark" : ""}`} style={{ background: phTone }}><span className="ph-corner">{i + 1}</span></div>
              </button>
            ))}
          </div>
          <div className="pdp-main">
            <div className={`ph ${phDark ? "ph-dark" : ""}`} style={{ background: phTone }}>
              <span className="ph-label">{shots[shot].label}</span>
              <span className="ph-corner">{shots[shot].code}</span>
            </div>
            <span className="pdp-save">Launch · save {off}%</span>
            <button className="pdp-wish" aria-label="Wishlist"><Icon name="heart" size={17} /></button>
          </div>
        </div>

        <div className="pdp-info">
          <span className="pdp-range">{product.range}</span>
          <h1 className="pdp-name">{product.name}</h1>

          <a href="#pdp-reviews" className="pdp-stars">
            <FiveStars n={5} size={15} />
            <span>{product.rating} · {product.reviews.toLocaleString("en-IN")} reviews</span>
          </a>

          <div className="pdp-price">
            <span className="now">₹{price}</span>
            <span className="was">₹{activePack.was}</span>
            <span className="tag">−{off}% off</span>
          </div>

          <p className="pdp-blurb">{product.blurb}</p>

          <div className="pdp-opt">
            <div className="olbl"><span>Pack size</span><strong>{activePack.label} · ₹{Math.round(activePack.price / activePack.pairs)}/pair</strong></div>
            <div className="pack-grid">
              {PACKS.map((pk) => (
                <button key={pk.id} className={`pack-card ${pack === pk.id ? "on" : ""}`} onClick={() => setPack(pk.id)}>
                  {pk.badge && <span className="pack-badge">{pk.badge}</span>}
                  <span className="pack-name">{pk.label}</span>
                  <span className="pack-sub">{pk.sub}</span>
                  <span className="pack-price">₹{pk.price}</span>
                  <span className="pack-unit">₹{Math.round(pk.price / pk.pairs)}/pair</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-opt">
            <div className="olbl"><span>Colour story</span><strong>{activeColorLabel}</strong></div>
            <div className="pdp-swatches">
              {product.swatches.map((s, i) => (
                <button key={i} className={`pdp-sw ${activeColor === s ? "on" : ""}`} onClick={() => setActiveColor(s)} aria-label={colorLabels[i]}>
                  <span className="dot" style={{ background: s, boxShadow: (s === "#FFFFFF" ? "inset 0 0 0 1px rgba(10,10,10,0.16)" : "none") }}></span>
                  <span className="swl">{colorLabels[i]}</span>
                </button>
              ))}
            </div>
            <div className="pdp-note">{pack === "single" ? `Single pair in your chosen colour · ${activeColorLabel}` : `${activePack.label} includes the full colour story · ${product.colorNote}`}</div>
          </div>

          <div className="pdp-opt">
            <div className="olbl"><span>Size</span><a className="size-guide" href="#size">Sizing guide</a></div>
            <div className="pdp-sizes">
              {[{ id: "S", sub: "UK 3–6" }, { id: "M", sub: "UK 6–9" }, { id: "L", sub: "UK 9–12" }].map((s) => (
                <button key={s.id} className={`pdp-size ${size === s.id ? "on" : ""}`} onClick={() => setSize(s.id)}>
                  <b>{s.id}</b><span>{s.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-buy">
            <div className="pdp-qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Icon name="minus" size={15} /></button>
              <span className="val">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase"><Icon name="plus" size={15} /></button>
            </div>
            <button className="btn btn-primary pdp-add" onClick={add}>Add to bag — ₹{price * qty} <Icon name="arrow" size={15} /></button>
          </div>
          <div className="pdp-secondary">
            <button><Icon name="heart" size={15} /> Wishlist</button>
            <span className="div"></span>
            <button><Icon name="repeat" size={15} sw={1.4} /> Subscribe &amp; save 15%</button>
          </div>

          <div className="pdp-trust">
            {PROMISES.map((p, i) => (
              <div className="pdp-trust-item" key={i}>
                <span className="ico"><Icon name={p.ico} size={16} sw={1.4} /></span>
                <div><strong>{p.t}</strong><small>{p.d.split(".")[0]}.</small></div>
              </div>
            ))}
          </div>

          <div className="pdp-accordion">
            {accordion.map((a) => (
              <div className={`pacc ${open.includes(a.id) ? "open" : ""}`} key={a.id}>
                <button className="pacc-head" onClick={() => toggle(a.id)}>
                  {a.title}<span className="pacc-ico"><Icon name={open.includes(a.id) ? "minus" : "plus"} size={16} sw={1.5} /></span>
                </button>
                <div className="pacc-body"><div className="pacc-inner">{a.body}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section pdp-related" data-screen-label="PDP · Wear it with">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow"><span className="dot"></span>Wear it with</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>The rest of the range.</h2>
          </div>
          <div className="right"><a href="Collection.html" className="btn-link">Shop all <Icon name="arrow" size={13} /></a></div>
        </div>
        <div className="pdp-related-grid">
          {related.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
        </div>
      </section>

      <div id="pdp-reviews"></div>
      <Reviews />

      <div className={`pdp-buybar ${showBar ? "visible" : ""}`}>
        <div className="bb-meta">
          <div className="bb-name">{product.name}</div>
          <div className="bb-sub">₹{price} · {activePack.label} · Size {size}</div>
        </div>
        <button className="btn btn-primary" onClick={add}>Add to bag — ₹{price * qty}</button>
      </div>
    </>
  );
};

Object.assign(window, { PDP });

// Gripfeet — Categories, Featured products grid, Product card, Quick-View modal
// Updated for the May 2026 catalogue: each SKU is a pre-packed set.

// ---------- Categories ----------
const Categories = () => (
  <section className="wrap section" id="shop" data-screen-label="02 Shop by Category">
    <div className="section-head">
      <div className="left">
        <span className="eyebrow">02 — Shop the range<span className="dot"></span>By cuff height</span>
        <h2 className="h-section">A grip sock <em className="italic-mark">for every step</em>.</h2>
      </div>
      <div className="right">
        <a href="#shop-all" className="btn-link">All ranges <Icon name="arrow" size={12} /></a>
      </div>
    </div>

    <div className="cat-grid">
      {CATEGORIES.map((c) => (
        <a key={c.id} href={`#${c.id}`} className={`cat-card span-${c.span}`}>
          <Placeholder
            label={`${c.cuff} · ${c.line}`}
            code={`GF · ${c.code}`}
            style={{ background: c.tone }}
            className={c.darkPh ? "ph-dark" : ""}
          />
          {c.badge && <span className={`badge ${c.dark ? "dark" : ""}`}>{c.badge}</span>}
          <div className="meta">
            <div>
              <div className="name">
                <small>{c.code} · {c.cuff}</small>
                {c.line}
              </div>
              <p className="desc">{c.desc}</p>
              <span className="cat-pack">{c.pack}</span>
            </div>
            <span className="arrow"><Icon name="arrow" size={14} /></span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

// ---------- Product card ----------
const Product = ({ p, onQuickView, onAdd }) => {
  const phBg = p.id.includes("crew") ? "#1a1a1a"
            : p.id.includes("kid")  ? "#F2EBDF"
            : "#EFEEEA";
  const href = `PDP.html?product=${p.id}`;
  return (
    <a className="product" href={href}>
      <Placeholder
        label={`${p.name} · ${p.pack.toLowerCase()}`}
        code={p.code}
        style={{ background: phBg }}
        className={p.id.includes("crew") ? "ph-dark" : ""}
      />
      <div className="swatches">
        {p.swatches.map((s, i) => (
          <span
            key={i}
            className="swatch"
            style={{
              background: s,
              borderColor: s === "#FFFFFF" || s === "#F2EBDF" ? "rgba(10,10,10,0.14)" : "rgba(10,10,10,0.18)",
            }}
          ></span>
        ))}
      </div>
      <button className="wish" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} aria-label="Wishlist">
        <Icon name="heart" size={14} />
      </button>
      <button className="quick-add" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd && onAdd(p); }}>
        Quick add — ₹{p.price} <Icon name="plus" size={12} />
      </button>

      <div className="meta">
        <div>
          <div className="name">{p.name}</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{p.range}</div>
        </div>
        <div className="price">
          <span className="strike">₹{p.was}</span>
          ₹{p.price}
        </div>
        <div className="sub muted">{p.colorNote} · {p.pack}</div>
      </div>
    </a>
  );
};

// ---------- Featured row ----------
const Featured = ({ onQuickView, onAdd }) => (
  <section className="section band" id="featured" data-screen-label="03 Featured Sets">
    <div className="wrap">
      <div className="section-head">
        <div className="left">
          <span className="eyebrow">03 — Newly knit<span className="dot"></span>Featured sets</span>
          <h2 className="h-section">One pack <em className="italic-mark">from every range</em>.</h2>
        </div>
        <div className="right">
          <a href="#shop" className="btn-link">Shop all <Icon name="arrow" size={12} /></a>
        </div>
      </div>

      <div className="product-grid">
        {FEATURED.map(p => (
          <Product key={p.id} p={p} onQuickView={onQuickView} onAdd={onAdd} />
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <div className="sub-banner">
          <span className="icn"><Icon name="repeat" size={18} sw={1.4} /></span>
          <div className="copy">
            <h4>Subscribe & save 15% on every refill.</h4>
            <p>Pick a pack. Pick a cadence — every 2, 3 or 6 months. Skip or cancel anytime. Free shipping always.</p>
          </div>
          <button className="btn btn-ghost">How it works <Icon name="arrow" size={12} /></button>
        </div>
      </div>
    </div>
  </section>
);

// ---------- Quick View modal ----------
const QuickView = ({ open, product, onClose, onAdd }) => {
  const [size, setSize] = React.useState("M");

  React.useEffect(() => {
    if (product) setSize("M");
  }, [product]);

  if (!product) return null;

  const phBg = product.id.includes("crew") ? "#1a1a1a"
            : product.id.includes("kid")  ? "#F2EBDF"
            : "#EFEEEA";

  // Find palette labels for each swatch hex
  const colorLabels = product.swatches.map(hex => {
    const k = Object.values(PALETTE).find(p => p.hex.toUpperCase() === hex.toUpperCase());
    return k ? k.label : "—";
  });

  return (
    <>
      <div className={`modal-bg ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`modal ${open ? "open" : ""}`} role="dialog">
        <button className="close" onClick={onClose} aria-label="Close"><Icon name="close" size={16} /></button>
        <div className="modal-inner">
          <Placeholder
            label={`${product.name} · ${product.pack.toLowerCase()}`}
            code={product.code}
            style={{ background: phBg }}
            className={product.id.includes("crew") ? "ph-dark" : ""}
          />
          <div className="modal-body">
            <span className="eyebrow">{product.range}</span>
            <h3>{product.name}</h3>
            <div className="price-big">
              <span style={{ textDecoration: "line-through", color: "#9A9A96", marginRight: 10 }}>MRP ₹{product.was}</span>
              <span style={{ fontWeight: 500 }}>₹{product.price}</span>
              <span style={{ marginLeft: 10, color: "#A99577", fontSize: 12, letterSpacing: ".14em", textTransform: "uppercase" }}>Launch price</span>
            </div>

            <p className="desc">{product.blurb}</p>

            <div className="opt-group">
              <span className="lbl">Pack — {product.pack}</span>
              <div className="pills">
                <div className="pill active" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "default" }}>
                  <Icon name="check" size={12} sw={1.6} />
                  {product.pack}
                </div>
              </div>
            </div>

            <div className="opt-group">
              <span className="lbl">Colour story — {product.colorNote}</span>
              <div className="pills">
                {product.swatches.map((s, i) => (
                  <div key={i} className="pill" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "default" }}>
                    <span style={{ width: 14, height: 14, background: s, border: "1px solid rgba(10,10,10,0.14)" }}></span>
                    {colorLabels[i]}
                  </div>
                ))}
              </div>
            </div>

            <div className="opt-group">
              <span className="lbl">Size</span>
              <div className="pills">
                {["S", "M", "L", "XL"].map(s => (
                  <button key={s} className={`pill ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <ul className="feature-list">
              <li><Icon name="check" size={14} sw={1.4} /> Stretch Supima yarn — soft, breathable & durable</li>
              <li><Icon name="check" size={14} sw={1.4} /> 100% silicone antislip grip, full-sole pattern</li>
              <li><Icon name="check" size={14} sw={1.4} /> Perfect fit · machine washable · made in India</li>
            </ul>

            <button className="btn btn-primary" onClick={() => onAdd(product, { size })}>
              Add to bag — ₹{product.price} <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { Categories, Featured, Product, QuickView });

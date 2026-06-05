// Gripfeet — PDP component
// Standalone product detail page. Reads ?product=<id> from the URL; defaults to Soft Studio.

const PDP = ({ product }) => {
  const [activeColor, setActiveColor] = React.useState(product.swatches[0]);
  const [size, setSize] = React.useState("M");
  const [qty, setQty] = React.useState(1);
  const [shot, setShot] = React.useState(0);
  const [open, setOpen] = React.useState(["materials"]);
  const [showBar, setShowBar] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phBg = product.id.startsWith("crew") ? "#1a1a1a"
             : product.id.startsWith("kid")  ? "#F2EBDF"
             : "#EFEEEA";
  const phDark = phBg === "#1a1a1a";

  const shots = [
    { label: `${product.name} · pair · lay-flat`, code: `${product.code} · 01` },
    { label: "Detail · silicone grip pattern",     code: `${product.code} · 02` },
    { label: "On-foot · studio shot",              code: `${product.code} · 03` },
    { label: "Lifestyle · folded stack",           code: `${product.code} · 04` },
    { label: "Packaging · card sleeve",            code: `${product.code} · 05` },
  ];

  const colorLabels = product.swatches.map(hex => {
    const k = Object.values(PALETTE).find(p => p.hex.toUpperCase() === hex.toUpperCase());
    return k ? k.label : "—";
  });
  const activeColorLabel = colorLabels[product.swatches.indexOf(activeColor)] || colorLabels[0];

  const accordion = [
    {
      id: "materials",
      title: "Materials & Make",
      body: (
        <>
          <p>72% Stretch Supima cotton · 24% recycled nylon · 4% elastane. 100% food-grade silicone grip pattern on the full sole. Reinforced heel & toe.</p>
          <ul>
            <li>Long-staple Supima for softness and durability</li>
            <li>Full-sole silicone — not painted-on rubber</li>
            <li>Ribbed cuff for a secure, no-slip-down fit</li>
          </ul>
        </>
      ),
    },
    {
      id: "size",
      title: "Sizing & Fit",
      body: (
        <>
          <p>Available in 2–3 sizes so most feet land in the middle of the band. UK 3–6 (S), 6–9 (M), 9–12 (L). Wears slightly snug out of the wash — softens after first wear.</p>
        </>
      ),
    },
    {
      id: "care",
      title: "Care & Washing",
      body: (
        <>
          <p>Machine washable, cold cycle, inside out. Tumble dry low or air dry. Do not iron the silicone sole. The pair will last 80+ wears with normal care.</p>
        </>
      ),
    },
    {
      id: "ship",
      title: "Shipping & Returns",
      body: (
        <>
          <p>Ships globally, 4–7 day delivery. Free shipping over ₹999 / $25. COD available across India. All sales are final, with a quality guarantee — if anything's wrong with the make, we replace it.</p>
        </>
      ),
    },
  ];

  const toggle = (id) => setOpen(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id]);

  // related — same range first, then others
  const related = PRODUCTS
    .filter(p => p.id !== product.id)
    .sort((a, b) => (a.rangeId === product.rangeId ? -1 : 1) - (b.rangeId === product.rangeId ? -1 : 1))
    .slice(0, 4);

  return (
    <>
      <div className="wrap pdp-breadcrumb">
        <a href="Gripfeet.html">Shop</a>
        <span className="sep">/</span>
        <a href={`Gripfeet.html#${product.rangeId}`}>{product.range}</a>
        <span className="sep">/</span>
        <span className="here">{product.name}</span>
      </div>

      <section className="wrap pdp" data-screen-label="PDP · Hero">
        <div className="pdp-gallery">
          <div className="pdp-thumbs">
            {shots.map((s, i) => (
              <div key={i} className={`pdp-thumb ${shot === i ? "active" : ""}`} onClick={() => setShot(i)}>
                <Placeholder label="" code="" style={{ background: phBg }} className={phDark ? "ph-dark" : ""} />
              </div>
            ))}
          </div>
          <div className="pdp-main">
            <Placeholder
              label={shots[shot].label}
              code={shots[shot].code}
              style={{ background: phBg }}
              className={phDark ? "ph-dark" : ""}
            />
            <span className="save-pill">Launch · save 30%</span>
          </div>
        </div>

        <div className="pdp-info">
          <span className="range-tag">{product.range}</span>
          <h1>{product.name}</h1>
          <div className="price-line">
            <span className="price-now">₹{product.price}</span>
            <span className="price-was">MRP ₹{product.was}</span>
            <span className="launch-tag">Launch price</span>
          </div>
          <div className="stars-row">
            <Stars n={5} />
            <span>4.9 · 248 reviews</span>
          </div>

          <p className="blurb">{product.blurb}</p>

          <div className="pdp-opt">
            <div className="lbl"><span>Pack</span><strong>{product.pack}</strong></div>
            <div className="pills">
              <div className="pill active" style={{ display: "inline-flex", gap: 8, alignItems: "center", cursor: "default" }}>
                <Icon name="check" size={12} sw={1.6} /> {product.pack}
              </div>
            </div>
          </div>

          <div className="pdp-opt">
            <div className="lbl"><span>Colour story</span><strong>{activeColorLabel}</strong></div>
            <div className="swatch-row">
              {product.swatches.map((s, i) => (
                <button key={i} className={`sw ${activeColor === s ? "active" : ""}`} onClick={() => setActiveColor(s)}>
                  <span className="dot" style={{ background: s }}></span>
                  {colorLabels[i]}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "var(--ink-3)", letterSpacing: ".04em" }}>
              {product.pack} includes all three colours · {product.colorNote}
            </div>
          </div>

          <div className="pdp-opt">
            <div className="lbl"><span>Size</span><strong>{size}</strong></div>
            <div className="size-row">
              {[
                { id: "S",  label: "S",  sub: "UK 3–6" },
                { id: "M",  label: "M",  sub: "UK 6–9" },
                { id: "L",  label: "L",  sub: "UK 9–12" },
              ].map(s => (
                <button key={s.id} className={`pill ${size === s.id ? "active" : ""}`} onClick={() => setSize(s.id)}>
                  {s.label}
                  <span style={{ display: "block", fontSize: 10, opacity: 0.6, marginTop: 2, letterSpacing: ".06em" }}>{s.sub}</span>
                </button>
              ))}
            </div>
            <div className="size-helper">Perfect Fit · Available in 2–3 sizes · <a href="#size">Sizing guide</a></div>
          </div>

          <div className="pdp-qty-add">
            <div className="pdp-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease"><Icon name="minus" size={14} /></button>
              <span className="val">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} aria-label="Increase"><Icon name="plus" size={14} /></button>
            </div>
            <button className="btn btn-primary pdp-add">
              Add to bag — ₹{product.price * qty} <Icon name="arrow" size={14} />
            </button>
          </div>

          <div className="pdp-tertiary">
            <button className="btn btn-ghost">Add to wishlist</button>
            <button className="btn btn-ghost">Notify me of restock</button>
          </div>

          <div className="pdp-strip">
            {PROMISES.map((p, i) => (
              <div className="pdp-strip-item" key={i}>
                <span className="ico"><Icon name={p.ico} size={14} sw={1.4} /></span>
                <div>
                  <strong>{p.t}</strong>
                  <small>{p.d.split(".")[0]}.</small>
                </div>
              </div>
            ))}
          </div>

          <div className="pdp-accordion">
            {accordion.map(a => (
              <div className={`acc ${open.includes(a.id) ? "open" : ""}`} key={a.id}>
                <button className="acc-head" onClick={() => toggle(a.id)}>
                  {a.title}
                  <span className="plus"><Icon name="plus" size={16} sw={1.4} /></span>
                </button>
                <div className="acc-body">
                  <div className="acc-body-inner">{a.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <section className="wrap section pdp-related" data-screen-label="PDP · Wear it with">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">Wear it with<span className="dot"></span>The rest of the range</span>
            <h2 className="h-section">Quiet companions.</h2>
          </div>
          <div className="right">
            <a href="Gripfeet.html#shop" className="btn-link">Back to shop <Icon name="arrow" size={12} /></a>
          </div>
        </div>
        <div className="product-grid">
          {related.map(p => (
            <Product key={p.id} p={p} onQuickView={() => {}} onAdd={() => {}} />
          ))}
        </div>
      </section>

      <Reviews />

      <div className={`pdp-buybar ${showBar ? "visible" : ""}`}>
        <div className="meta">
          <div className="n">{product.name}</div>
          <div className="p">₹{product.price} · {size} · {product.pack}</div>
        </div>
        <button className="btn btn-primary">Add — ₹{product.price * qty}</button>
      </div>
    </>
  );
};

Object.assign(window, { PDP });

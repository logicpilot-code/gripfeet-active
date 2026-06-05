// Gripfeet ACTIVE — Shop by Height, product carousel, product card, Shop Trends, Quick View

// ---------- stars ----------
const Star = ({ filled = true, size = 13 }) => (
  <svg className="star" width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
    <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3Z" />
  </svg>
);
const FiveStars = ({ n = 5, size = 13 }) => (
  <span className="stars-svg">{Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < n} size={size} />)}</span>
);

const phBgFor = (id) =>
  id.includes("crew") ? "ph-dark" :
  id.includes("kid")  ? "" : "";
const phToneFor = (id) =>
  id.includes("crew") ? "#16160F" :
  id.includes("kid")  ? "#F2EBDF" : "#F3F0E8";

// ---------- Shop by Height ----------
const HEIGHT_CARDS = [
  { id: "loafer", n: "Loafer", line: "Invisible Grip", tone: "#EFE9DD" },
  { id: "ankle",  n: "Ankle",  line: "Mat Masters", tone: "#F3F0E8", badge: "Bestseller" },
  { id: "crew",   n: "Crew",   line: "Active Hold", tone: "#16160F", dark: true },
  { id: "kids",   n: "Kids",   line: "Lil Steps", tone: "#F2EBDF" },
];

const ShopByHeight = () => (
  <section className="wrap section" id="shop" data-screen-label="02 Shop by Height">
    <div className="section-head center">
      <div className="left">
        <span className="eyebrow"><span className="dot"></span>By cuff height</span>
        <h2 className="h-section" style={{ marginTop: 14 }}>Shop by Height</h2>
      </div>
    </div>
    <div className="height-grid">
      {HEIGHT_CARDS.map(c => (
        <a key={c.id} href={`Collection.html?range=${c.id}`} className="height-card">
          <div className="frame">
            {c.badge && <span className="badge">{c.badge}</span>}
            <div className={`ph ${c.dark ? "ph-dark" : ""}`} style={{ background: c.tone }}>
              <span className="ph-label">{c.n} · {c.line}</span>
              <span className="ph-corner">GF</span>
            </div>
          </div>
          <div className="label">
            <div className="n"><small>{c.line}</small>{c.n}</div>
            <span className="go"><Icon name="arrow" size={15} /></span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

// ---------- product card ----------
const ProductCard = ({ p, onAdd }) => {
  const href = `PDP.html?product=${p.id}`;
  const off = Math.round((1 - p.price / p.was) * 100);
  return (
    <a className="pcard" href={href}>
      <div className="pimg">
        <span className="save-tag">−{off}%</span>
        <button className="wish" onClick={(e)=>{e.preventDefault();e.stopPropagation();}} aria-label="Wishlist"><Icon name="heart" size={15} /></button>
        <div className={`ph ${phBgFor(p.id)}`} style={{ background: phToneFor(p.id) }}>
          <span className="ph-label">{p.name}</span>
          <span className="ph-corner">{p.code}</span>
        </div>
        <button className="quick-add" onClick={(e)=>{e.preventDefault();e.stopPropagation();onAdd&&onAdd(p);}}>
          Quick add — ₹{p.price} <Icon name="plus" size={13} />
        </button>
      </div>
      <div className="swatch-thumbs">
        {p.swatches.map((s,i)=>(
          <span key={i} className="sw" style={{ background: s, borderColor: (s==="#FFFFFF"||s==="#F2EBDF") ? "rgba(10,10,10,0.18)" : "rgba(10,10,10,0.14)" }}></span>
        ))}
      </div>
      <div className="prange">{p.range}</div>
      <div className="pname">{p.name}</div>
      <div className="prate"><Star size={13} /> {p.rating} <span className="muted">({p.reviews.toLocaleString("en-IN")})</span></div>
      <div className="pprice"><span className="was">₹{p.was}</span>₹{p.price}</div>
    </a>
  );
};

// ---------- tabbed carousel ----------
const CARO_TABS = [
  { id: "ankle",  label: "Studio" },
  { id: "crew",   label: "Training" },
  { id: "loafer", label: "Everyday" },
  { id: "kids",   label: "Kids" },
];

const FeaturedCarousel = ({ onAdd }) => {
  const [tab, setTab] = React.useState("ankle");
  const trackRef = React.useRef(null);
  const [prog, setProg] = React.useState({ left: 0, width: 100, atStart: true, atEnd: false });

  const list = PRODUCTS.filter(p => p.rangeId === tab);

  const measure = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const visible = el.clientWidth / el.scrollWidth;
    const left = max <= 0 ? 0 : (el.scrollLeft / max) * (1 - visible);
    setProg({
      left: left * 100,
      width: Math.min(100, visible * 100),
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    const t = setTimeout(measure, 40);
    return () => clearTimeout(t);
  }, [tab, measure]);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => { el.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); };
  }, [measure]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.5;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section band" id="featured" data-screen-label="03 Featured Sets">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow"><span className="dot"></span>Newly knit · Featured sets</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>Built for the way<br/>you move.</h2>
          </div>
          <div className="right">
            <div className="carousel-tabs">
              {CARO_TABS.map(t => (
                <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>{t.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="carousel">
          <div className="carousel-track" ref={trackRef}>
            {list.map(p => <ProductCard key={p.id} p={p} onAdd={onAdd} />)}
          </div>
          <div className="carousel-foot">
            <div className="arrows">
              <button className="round-btn" onClick={() => scrollBy(-1)} disabled={prog.atStart} aria-label="Previous"><span style={{display:"inline-flex",transform:"scaleX(-1)"}}><Icon name="arrow" size={17} /></span></button>
              <button className="round-btn" onClick={() => scrollBy(1)} disabled={prog.atEnd} aria-label="Next"><Icon name="arrow" size={17} /></button>
            </div>
            <div className="progress"><span className="bar" style={{ left: `${prog.left}%`, width: `${prog.width}%` }}></span></div>
            <a href={`Collection.html?range=${tab}`} className="btn-link seeall">Shop all <Icon name="arrow" size={13} /></a>
          </div>
        </div>

        <div style={{ marginTop: 44 }}>
          <div className="sub-banner">
            <span className="icn"><Icon name="repeat" size={20} sw={1.4} /></span>
            <div className="copy">
              <h4>Subscribe &amp; save 15% on every refill.</h4>
              <p>Pick a pack, pick a cadence — every 2, 3 or 6 months. Skip or cancel anytime. Free shipping, always.</p>
            </div>
            <button className="btn btn-light">How it works <Icon name="arrow" size={13} /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---------- Shop Trends (editorial) ----------
const TRENDS = [
  { id: "ankle", e: "Studio & Mat", t: "Mat Masters", tone: "#1e2017" },
  { id: "crew",  e: "Movement & Training", t: "Active Hold", tone: "#191919" },
  { id: "kids",  e: "Little Adventures", t: "Lil Steps", tone: "#20171c" },
];
const ShopTrends = () => (
  <section className="wrap section" id="trends" data-screen-label="04 Shop Trends">
    <div className="section-head">
      <div className="left">
        <span className="eyebrow"><span className="dot"></span>Worn everywhere</span>
        <h2 className="h-section" style={{ marginTop: 14 }}>Shop the ranges.</h2>
      </div>
      <div className="right"><a href="Collection.html" className="btn-link">All ranges <Icon name="arrow" size={13} /></a></div>
    </div>
    <div className="trends-grid">
      {TRENDS.map(t => (
        <a key={t.id} href={`Collection.html?range=${t.id}`} className="trend-card">
          <div className="ph ph-photo" style={{ background: t.tone }}>
            <span className="ph-label">{t.t} · lifestyle editorial</span>
            <span className="ph-corner">GF</span>
          </div>
          <div className="scrim"></div>
          <div className="tinfo">
            <div className="te">{t.e}</div>
            <div className="tt">{t.t}</div>
            <span className="tgo">Explore <Icon name="arrow" size={13} /></span>
          </div>
        </a>
      ))}
    </div>
  </section>
);

// ---------- Quick View ----------
const QuickView = ({ open, product, onClose, onAdd }) => {
  const [size, setSize] = React.useState("M");
  React.useEffect(() => { if (product) setSize("M"); }, [product]);
  if (!product) return null;
  const colorLabels = product.swatches.map(hex => {
    const k = Object.values(PALETTE).find(p => p.hex.toUpperCase() === hex.toUpperCase());
    return k ? k.label : "—";
  });
  return (
    <>
      <div className={`modal-bg ${open ? "open" : ""}`} onClick={onClose}></div>
      <div className={`modal ${open ? "open" : ""}`} role="dialog">
        <button className="close" onClick={onClose} aria-label="Close"><Icon name="close" size={17} /></button>
        <div className="modal-inner">
          <div className="mv">
            <div className={`ph ${phBgFor(product.id)}`} style={{ background: phToneFor(product.id) }}>
              <span className="ph-label">{product.name} · {product.pack.toLowerCase()}</span>
              <span className="ph-corner">{product.code}</span>
            </div>
          </div>
          <div className="modal-body">
            <span className="mrange">{product.range}</span>
            <h3>{product.name}</h3>
            <div className="price-big"><span className="was">₹{product.was}</span>₹{product.price}<span className="lp">Launch</span></div>
            <div className="prate" style={{display:"inline-flex",alignItems:"center",gap:6,fontSize:12,color:"var(--ink-2)",marginTop:6}}><Star size={13} /> {product.rating} ({product.reviews.toLocaleString("en-IN")})</div>
            <p className="mdesc">{product.blurb}</p>

            <div className="opt-group">
              <span className="olbl">Colour story — {product.colorNote}</span>
              <div className="pills">
                {product.swatches.map((s,i)=>(
                  <div key={i} className="pill" style={{cursor:"default"}}><span style={{width:13,height:13,borderRadius:"50%",background:s,border:"1px solid rgba(10,10,10,0.16)"}}></span>{colorLabels[i]}</div>
                ))}
              </div>
            </div>

            <div className="opt-group">
              <span className="olbl">Size</span>
              <div className="pills">
                {["S","M","L","XL"].map(s=>(
                  <button key={s} className={`pill ${size===s?"active":""}`} onClick={()=>setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <ul className="feature-list">
              <li><span className="tick"><Icon name="check" size={14} sw={1.6} /></span> Stretch Supima yarn — soft, breathable &amp; durable</li>
              <li><span className="tick"><Icon name="check" size={14} sw={1.6} /></span> 100% silicone antislip grip, full-sole pattern</li>
              <li><span className="tick"><Icon name="check" size={14} sw={1.6} /></span> {product.pack} · machine washable · made in India</li>
            </ul>

            <button className="btn btn-primary" onClick={()=>onAdd(product,{size})}>Add to bag — ₹{product.price} <Icon name="arrow" size={15} /></button>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { ShopByHeight, FeaturedCarousel, ProductCard, ShopTrends, QuickView, Star, FiveStars });

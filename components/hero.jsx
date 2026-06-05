// Gripfeet — Hero & Trust strip

const HERO_HEADLINES = [
  // Headline + sub combinations. First is the default.
  {
    eyebrow: "Premium Grip Socks · Traction Triumphs",
    h1: <>Grip socks for <br /><em className="italic-mark">every step, every day.</em></>,
    sub: "Anti-slip socks for the way you actually live — Pilates at sunrise, hardwood floors at midnight, the long flight in between. Stretch Supima yarn up top. 100% silicone on the sole. Made in India.",
  },
];

const Hero = ({ onShop }) => {
  const h = HERO_HEADLINES[0];
  return (
    <section className="wrap" id="home" data-screen-label="01 Hero">
      <div className="hero">
        <div className="hero-num">GF · 001 / HERO</div>

        <div className="hero-copy fade-in">
          <div>
            <div className="eyebrow">{h.eyebrow}</div>
            <h1 className="h-display" style={{ marginTop: 28 }}>{h.h1}</h1>
            <p className="lede" style={{ marginTop: 28 }}>{h.sub}</p>

            <div className="hero-actions" style={{ marginTop: 36 }}>
              <button className="btn btn-primary" onClick={onShop}>
                Shop Grip Socks <Icon name="arrow" size={14} />
              </button>
              <a className="btn-link" href="#story">Our story</a>
            </div>
          </div>

          <div className="hero-meta">
            <div className="stat">
              <div className="num">100<span style={{fontSize:"18px",verticalAlign:"super",marginLeft:"4px"}}>%</span></div>
              <span className="lbl">Silicone Grip</span>
            </div>
            <div className="stat">
              <div className="num">Supima</div>
              <span className="lbl">Cotton Body</span>
            </div>
            <div className="stat">
              <div className="num">4–7<span style={{fontSize:"18px",marginLeft:"4px"}}>days</span></div>
              <span className="lbl">Global Delivery</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <Placeholder label="Hero lifestyle · Pilates on mat, mid-stretch · soft daylight, cotton studio" code="GF · 4:5 · 2400px" />
          <div className="hero-tag">
            <div className="swatch"></div>
            <div className="meta">
              Soft Studio · Mat Masters
              <small>Set of 3 pairs · ₹699 launch</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Trust = () => {
  // "Our Promise" — straight from the catalogue
  const items = [
    { ico: "leaf",   label: "Stretch Supima Yarn",    sub: "Soft, breathable & durable" },
    { ico: "grip",   label: "Superior Antislip Grip", sub: "100% silicone, full sole" },
    { ico: "fit",    label: "Perfect Fit",            sub: "Available in 2–3 sizes" },
    { ico: "washer", label: "Easy Care",              sub: "Machine washable" },
  ];
  return (
    <div className="wrap">
      <div className="trust">
        <div className="trust-inner">
          {items.map((it, i) => (
            <div key={i} className="trust-item">
              <span className="ico"><Icon name={it.ico} size={16} sw={1.4} /></span>
              <div>
                {it.label}
                <small>{it.sub}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Marquee = () => {
  const items = [
    "Pilates", "Yoga", "Barre", "Travel", "Home", "Hardwood", "Marble", "Studio", "Football", "Sleep",
  ];
  const loop = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <React.Fragment key={i}>
            <span className={i % 3 === 1 ? "it" : ""}>{t}</span>
            <span className="sep">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { Hero, Trust, Marquee });

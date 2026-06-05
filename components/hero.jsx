// Gripfeet ACTIVE — Hero, Trust strip, Statement, Move band

const Hero = ({ onShop }) => (
  <section className="hero" id="home" data-screen-label="01 Hero">
    <div className="hero-media">
      <div className="ph ph-photo">
        <span className="ph-label">Hero · runners / movers mid-stride · grip socks in frame · motion blur, daylight</span>
        <span className="ph-corner">GF · 16:9 · 2880px</span>
      </div>
    </div>

    <div className="hero-content fade-up">
      <div className="eyebrow"><span className="dot"></span>Premium Grip Socks · Traction Triumphs</div>
      <h1>Made to Grip.</h1>
      <p className="hero-sub">
        Anti-slip socks for the way you actually move — sunrise Pilates, hardwood
        floors, the long flight in between. Supima up top, 100% silicone on the sole.
      </p>
      <div className="hero-actions">
        <button className="btn btn-light btn-lg" onClick={onShop}>Shop Grip Socks <Icon name="arrow" size={15} /></button>
        <a className="btn btn-ghost-light btn-lg" href="#bundles">Shop Bundles</a>
      </div>
    </div>

    <div className="hero-badges">
      <span><span className="b-dot"></span>100% Silicone Grip</span>
      <span><span className="b-dot"></span>Stretch Supima Cotton</span>
      <span><span className="b-dot"></span>Made in India</span>
      <span><span className="b-dot"></span>4–7 Day Global Delivery</span>
    </div>
  </section>
);

const Trust = () => {
  const items = [
    { ico: "leaf",   t: "Stretch Supima Yarn",    s: "Soft, breathable & durable" },
    { ico: "grip",   t: "Superior Antislip Grip",  s: "100% silicone, full sole" },
    { ico: "fit",    t: "Perfect Fit",             s: "Available in 2–3 sizes" },
    { ico: "washer", t: "Easy Care",               s: "Machine washable" },
  ];
  return (
    <div className="wrap">
      <div className="trust">
        <div className="trust-inner">
          {items.map((it, i) => (
            <div key={i} className="trust-item">
              <span className="ico"><Icon name={it.ico} size={18} sw={1.4} /></span>
              <div>
                <div className="t">{it.t}</div>
                <small>{it.s}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Statement = () => (
  <section className="wrap statement" data-screen-label="Statement">
    <p>
      <span className="lead">India's grip sock you'd actually wear out of the studio — </span>
      <span className="rest">trusted on the mat, loved for everyday.</span>
    </p>
    <div className="foot">
      <div className="stat"><b>4.9</b><span>Avg rating</span></div>
      <div className="div"></div>
      <div className="stat"><b>1,284</b><span>Reviews</span></div>
      <div className="div"></div>
      <div className="stat"><b>11 SKUs</b><span>Across 4 ranges</span></div>
      <div className="div"></div>
      <div className="stat"><b>100%</b><span>Silicone sole</span></div>
    </div>
  </section>
);

const MoveBand = () => (
  <section className="move-band" data-screen-label="Move band" aria-hidden="true">
    <div className="ph ph-photo">
      <span className="ph-label">Full-bleed · feet in motion on stairs / street · grip socks + trainers</span>
      <span className="ph-corner">GF · BAND</span>
    </div>
    <div className="scrim"></div>
    <h2>Every Step,<br/>Every Day.</h2>
  </section>
);

Object.assign(window, { Hero, Trust, Statement, MoveBand });

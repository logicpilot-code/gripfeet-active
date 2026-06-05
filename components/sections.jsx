// Gripfeet ACTIVE — Story, Promises, Palette, Bundles, Reviews, Gifting, Newsletter, Footer, Cart, WhatsApp

const Story = () => (
  <section className="wrap section" id="story" data-screen-label="05 Brand Story">
    <div className="story">
      <div className="visual">
        <div className="ph"><span className="ph-label">Editorial · macro of knit + silicone grip dots</span><span className="ph-corner">GF · 4:5</span></div>
      </div>
      <div className="text">
        <span className="eyebrow"><span className="dot"></span>Our story · Made in India</span>
        <h2 className="h-section">A grip sock that finally feels like a sock.</h2>
        <p>Most grip socks fall into two camps — clinical and forgettable, or loud and over-sporty. We sat between them and built Gripfeet for the way people actually move: studios, hotel rooms, school runs, long flights, slow Sundays.</p>
        <p>We knit ours in-house in India — Supima cotton up top, a 100% silicone grip pattern on the sole. A manufacturing depth most lifestyle brands have to import. The result is the first Made-in-India grip sock you'd genuinely wear out of the studio.</p>
        <div className="sig">The Gripfeet team<small>Knit in India · Designed for everywhere</small></div>
      </div>
    </div>
  </section>
);

const USPSection = () => {
  const narrative = [
    ...PROMISES.map((p, i) => ({ ...p, n: `0${i+1}` })),
    { n: "05", t: "Made in India", d: "Designed and knit in-house with the manufacturing depth most lifestyle brands import. Closer to the loom, fewer compromises.", ico: "india" },
    { n: "06", t: "Designed for Modern Life", d: "A wardrobe sock that happens to grip. Studio, hardwood, hotel rooms, sofa Sundays — for every step, every day.", ico: "lifestyle" },
  ];
  return (
    <section className="section tight band" data-screen-label="06 Our Promise">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow"><span className="dot"></span>Our promise · Six things that matter</span>
            <h2 className="h-section" style={{ marginTop: 14 }}>Quietly built,<br/>obsessively.</h2>
          </div>
        </div>
        <div className="usps">
          {narrative.map((u, i) => (
            <div className="usp" key={i}>
              <span className="n">{u.n}</span>
              <span className="usp-ico"><Icon name={u.ico} size={18} sw={1.3} /></span>
              <h3 className="t">{u.t}</h3>
              <p className="d">{u.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Palette = () => {
  const groups = [
    { title: "Core Neutrals", keys: ["white", "black", "warmBeige", "grey", "dustyBrown"] },
    { title: "Soft Pastels", keys: ["sage", "lavender", "butter", "mint", "iceBlue", "pink"] },
    { title: "Heritage Sport Tones", keys: ["red", "navy", "deepGrey"] },
  ];
  return (
    <section className="wrap section tight" id="palette" data-screen-label="07 Signature Palette">
      <div className="section-head">
        <div className="left">
          <span className="eyebrow"><span className="dot"></span>Signature palette</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>Colours that get along.</h2>
        </div>
        <div className="right">
          <span className="muted" style={{ fontSize: 13, maxWidth: "30ch" }}>Thoughtfully curated for comfort, style &amp; everyday function.</span>
        </div>
      </div>
      <div className="palette-groups">
        {groups.map((g, i) => (
          <div className="palette-group" key={i}>
            <span className="palette-label">{g.title}</span>
            <div className="palette-chips">
              {g.keys.map(k => (
                <div className="palette-chip" key={k}>
                  <span className="dot" style={{ background: PALETTE[k].hex, boxShadow: `inset 0 0 0 1px ${PALETTE[k].ring}` }}></span>
                  <span className="lab">{PALETTE[k].label}</span>
                  <span className="hex">{PALETTE[k].hex}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Bundles = ({ onAdd }) => (
  <section className="wrap section" id="bundles" data-screen-label="08 Bundles">
    <div className="section-head">
      <div className="left">
        <span className="eyebrow"><span className="dot"></span>Pack &amp; save · Bundles</span>
        <h2 className="h-section" style={{ marginTop: 14 }}>Buy them in threes.</h2>
      </div>
      <div className="right"><span className="muted" style={{ fontSize: 13 }}>Free shipping over ₹999 · COD available</span></div>
    </div>
    <div className="bundles">
      {BUNDLES.map((b, i) => (
        <div key={i} className={`bundle ${b.featured ? "featured" : ""}`}>
          <span className="save">{b.save}</span>
          <div className="tier-label">{b.tag}</div>
          <h3 className="tier-name">{b.name}</h3>
          <div className="visual">
            <div className={`ph ${b.featured ? "ph-dark" : ""}`}><span className="ph-label">{b.name} · folded stack</span><span className="ph-corner">GF · BDL 0{i+1}</span></div>
          </div>
          <p className="bdesc">{b.desc}</p>
          <ul>
            {b.list.map((it, j) => (<li key={j}><span className="tick"><Icon name="check" size={14} sw={1.6} /></span>{it}</li>))}
          </ul>
          <div className="price-row"><span className="price-now">₹{b.price}</span><span className="price-then">₹{b.was}</span></div>
          <button className="btn btn-outline cta-btn" onClick={() => onAdd({ id: `bundle-${i}`, name: `${b.name} Bundle`, range: b.tag, colorNote: "Mixed colour stories", pack: b.desc, code: `GF-BDL-0${i+1}`, price: b.price, was: b.was })}>
            {b.cta} <Icon name="arrow" size={14} />
          </button>
        </div>
      ))}
    </div>
  </section>
);

const Reviews = () => (
  <section className="section band" data-screen-label="09 Reviews">
    <div className="wrap">
      <div className="section-head">
        <div className="left">
          <span className="eyebrow"><span className="dot"></span>Worn-in opinions · Reviews</span>
          <h2 className="h-section" style={{ marginTop: 14 }}>Quiet wins, in their words.</h2>
        </div>
        <div className="right">
          <div className="reviews-rating">
            <span className="big">4.9</span>
            <div className="meta">
              <div className="stars"><FiveStars n={5} size={15} /></div>
              <div className="mono" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--ink-2)" }}>1,284 reviews</div>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews">
        {REVIEWS.map((r, i) => (
          <div className="review" key={i}>
            <span className="stars"><FiveStars n={r.stars} size={14} /></span>
            <p className="quote">"{r.quote}"</p>
            <div className="who"><span className="name">{r.name}</span><span className="loc">{r.loc}</span></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Gifting = () => (
  <section className="wrap section" id="gifting" data-screen-label="10 Gifting">
    <div className="gifting">
      <div className="visual">
        <div className="ph ph-dark"><span className="ph-label">Linen pouch · 3 folded pairs · hand-tied</span><span className="ph-corner">GF · GIFT</span></div>
      </div>
      <div>
        <span className="eyebrow"><span className="dot"></span>Gift &amp; travel</span>
        <h3>The cleanest small gift we know.</h3>
        <p>Hand-folded into a Gripfeet linen pouch — a premium-feeling essential that's quietly useful. For the friend who travels, the partner who's just got into Pilates, the parent on hardwood floors.</p>
        <ul>
          <li><span className="n">A</span>Hand-tied linen pouch</li>
          <li><span className="n">B</span>Personalised note card</li>
          <li><span className="n">C</span>Three-pair gift set</li>
          <li><span className="n">D</span>Free shipping worldwide</li>
        </ul>
        <div className="actions">
          <button className="btn btn-light">Shop gifting <Icon name="arrow" size={14} /></button>
          <button className="btn btn-ghost-light">Build a custom set</button>
        </div>
      </div>
    </div>
  </section>
);

const Newsletter = () => {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const submit = (e) => { e.preventDefault(); if (!email || !email.includes("@")) return; setSent(true); };
  return (
    <section className="wrap" data-screen-label="11 Newsletter">
      <div className="newsletter">
        <div>
          <span className="eyebrow"><span className="dot"></span>Letters from the studio</span>
          <h3 style={{ marginTop: 16 }}>Drop your email, get ₹200 off.</h3>
          <p>One quiet note a month — new colourways, studio drops, the occasional travel-essentials list. No spam, no neon banners.</p>
        </div>
        <div>
          {!sent ? (
            <form onSubmit={submit}>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              <button type="submit" className="btn btn-primary">Subscribe <Icon name="arrow" size={14} /></button>
            </form>
          ) : (
            <div className="success">Welcome in — your ₹200 off is on its way.</div>
          )}
          <div className="fine">By subscribing you agree to receive marketing emails. Unsubscribe any time.</div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer" data-screen-label="12 Footer">
    <div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <img className="gf-mark gf-mark-sm footer-logo" src="assets/gripfeet-logo-cropped.png" alt="Gripfeet" />
          <p className="footer-tag">Anti-slip socks for the way you actually move. Supima up top, 100% silicone on the sole — knit in India, worn everywhere.</p>
          <div className="footer-socials">
            <a href="#ig" aria-label="Instagram"><Icon name="ig" size={16} sw={1.4} /></a>
            <a href="#tt" aria-label="TikTok"><Icon name="tt" size={16} sw={1.4} /></a>
            <a href="#pn" aria-label="Pinterest"><Icon name="pin" size={16} sw={1.4} /></a>
            <a href="#wa" aria-label="WhatsApp"><Icon name="wa" size={14} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="Collection.html">All socks</a></li>
            <li><a href="Collection.html?range=ankle">Ankle · Mat Masters</a></li>
            <li><a href="Collection.html?range=crew">Crew · Active Hold</a></li>
            <li><a href="Collection.html?range=loafer">Loafer · Invisible Grip</a></li>
            <li><a href="Collection.html?range=kids">Kids · Lil Steps</a></li>
            <li><a href="Gripfeet.html#bundles">Bundles &amp; gifting</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#ship">Shipping &amp; delivery</a></li>
            <li><a href="#returns">All sales final</a></li>
            <li><a href="#cod">COD &amp; payment</a></li>
            <li><a href="#size">Sizing guide</a></li>
            <li><a href="#care">Care &amp; washing</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="Gripfeet.html#story">Our story</a></li>
            <li><a href="#made">Made in India</a></li>
            <li><a href="#wholesale">Wholesale</a></li>
            <li><a href="#contact">Contact us</a></li>
          </ul>
          <div className="footer-region">
            <span className="rlbl">Ships globally</span>
            <span className="rval">4–7 days · EN · ₹ INR</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Gripfeet · Made in India</span>
        <span className="pay"><span>VISA</span><span>MC</span><span>AMEX</span><span>UPI</span><span>COD</span></span>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </div>

    {/* Silicone grip-dot signature band — Gripfeet's own product motif, not a wordmark */}
    <div className="footer-grip" aria-hidden="true">
      <div className="grip-texture"></div>
      <div className="grip-line">
        <span>Every Step</span>
        <span className="g-dot"></span>
        <span>Every Day</span>
        <span className="g-dot"></span>
        <span>Made to Grip</span>
      </div>
    </div>
  </footer>
);

const CartDrawer = ({ open, items, onClose, onQty, onRemove }) => {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 99;
  return (
    <>
      <div className={`drawer-bg ${open ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <span className="title">Your bag {items.length > 0 && <span className="muted" style={{ fontSize: 14, marginLeft: 4, fontWeight: 400 }}>({items.length})</span>}</span>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="close" size={20} /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <span className="ic"><Icon name="bag" size={20} /></span>
              <h4>Bag's empty.</h4>
              <p>Add a pack, or build a three-pack to save up to 39%.</p>
              <button className="btn btn-primary" onClick={onClose}>Continue shopping <Icon name="arrow" size={14} /></button>
            </div>
          ) : (
            items.map((it) => (
              <div className="cart-line" key={it.lineId}>
                <div className="ci"><div className={`ph ${it.phDark ? "ph-dark" : ""}`} style={{ background: it.phTone || "#F3F0E8" }}></div></div>
                <div>
                  <div className="name">{it.name}</div>
                  <div className="var">{it.variant}</div>
                  <div className="qty">
                    <button onClick={() => onQty(it.lineId, -1)} aria-label="Decrease"><Icon name="minus" size={13} /></button>
                    <span>{it.qty}</span>
                    <button onClick={() => onQty(it.lineId, +1)} aria-label="Increase"><Icon name="plus" size={13} /></button>
                  </div>
                </div>
                <div>
                  <div className="price">₹{(it.price * it.qty).toLocaleString("en-IN")}</div>
                  <button className="remove" onClick={() => onRemove(it.lineId)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="row"><span className="lbl">Subtotal</span><span className="val">₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="row" style={{ marginBottom: 16 }}><span className="lbl">Shipping</span><span className="muted" style={{ fontSize: 13 }}>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
            <button className="btn btn-primary">Checkout — ₹{(subtotal + shipping).toLocaleString("en-IN")} <Icon name="arrow" size={14} /></button>
            <div className="fine">Ships in 1–2 days · All sales final · Quality guaranteed</div>
          </div>
        )}
      </aside>
    </>
  );
};

const WhatsApp = () => (
  <a className="wa" href="#wa-chat" aria-label="Chat on WhatsApp">
    <span className="wa-dot"></span>
    <Icon name="wa" size={14} />
    <span className="wa-label">Chat with us</span>
  </a>
);

Object.assign(window, { Story, USPSection, Palette, Bundles, Reviews, Gifting, Newsletter, Footer, CartDrawer, WhatsApp });

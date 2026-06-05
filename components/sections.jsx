// Gripfeet — Brand story, USPs, Bundles, Reviews, Gifting, Newsletter, Footer, Cart drawer, WhatsApp button

const Story = () => (
  <section className="wrap section" id="story" data-screen-label="04 Brand Story">
    <div className="story">
      <div className="visual">
        <Placeholder label="Editorial · close-up of knit & silicone dots" code="GF · 4:5" />
      </div>
      <div className="text">
        <span className="eyebrow">04 — Our story<span className="dot"></span>Made in India</span>
        <h2 className="h-section">A grip sock <em className="italic-mark">that finally feels like a sock.</em></h2>
        <p style={{ marginTop: 28 }}>
          Most grip socks fall into two camps — clinical and forgettable, or loud and over-sporty.
          We sat between them and built Gripfeet for the way people actually move: studios, hotel rooms,
          school runs, long flights, Sunday mornings.
        </p>
        <p>
          We knit ours in-house in India, with Supima cotton up top and a 100% silicone grip pattern
          on the sole — a manufacturing depth most lifestyle brands have to import. The result is the
          first Made-in-India grip sock you could genuinely wear out of the studio.
        </p>
        <p>
          Calm, considered, comfortable. A wardrobe sock that happens to grip.
        </p>
        <div className="sig">
          The Gripfeet team
          <small>Knit in India · Designed for everywhere</small>
        </div>
      </div>
    </div>
  </section>
);

const USPSection = () => {
  // 4 catalogue promises + 2 brand-narrative blocks
  const narrative = [
    ...PROMISES.map((p, i) => ({ ...p, n: `0${i+1}` })),
    { n: "05", t: "Made in India", d: "Designed and knit in-house with the manufacturing depth most lifestyle brands import. Closer to the loom, fewer compromises.", ico: "india" },
    { n: "06", t: "Designed for Modern Lifestyles", d: "A wardrobe sock that happens to grip. Studio, hardwood, hotel rooms, sofa Sundays — Gripfeet is for every step, every day.", ico: "lifestyle" },
  ];
  return (
    <section className="section tight band" data-screen-label="05 Why Gripfeet">
      <div className="wrap">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">05 — Our promise<span className="dot"></span>Six things that matter</span>
            <h2 className="h-section">Quietly built, <em className="italic-mark">obsessively</em>.</h2>
          </div>
        </div>
        <div className="usps">
          {narrative.map((u, i) => (
            <div className="usp" key={i}>
              <span className="n">{u.n}</span>
              <h3 className="t">{u.t}</h3>
              <p className="d">{u.d}</p>
              <span className="usp-ico" aria-hidden="true"><Icon name={u.ico} size={18} sw={1.3} /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---------- Signature Colour Palette ----------
const Palette = () => {
  const groups = [
    {
      title: "Core Neutrals",
      keys: ["white", "black", "warmBeige", "grey", "dustyBrown"],
    },
    {
      title: "Soft Pastels",
      keys: ["sage", "lavender", "butter", "mint", "iceBlue", "pink"],
    },
    {
      title: "Heritage Sport Tones",
      keys: ["red", "navy", "deepGrey"],
    },
  ];
  return (
    <section className="wrap section tight" id="palette" data-screen-label="05b Signature Palette">
      <div className="section-head">
        <div className="left">
          <span className="eyebrow">05b — Signature palette<span className="dot"></span>Thoughtfully curated</span>
          <h2 className="h-section">Colours <em className="italic-mark">that get along</em>.</h2>
        </div>
        <div className="right">
          <span className="muted" style={{ fontSize: 13, maxWidth: "28ch" }}>
            Thoughtfully curated colours for comfort, style & everyday function.
          </span>
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
  <section className="wrap section" id="bundles" data-screen-label="06 Bundles">
    <div className="section-head">
      <div className="left">
        <span className="eyebrow">06 — Pack & save<span className="dot"></span>Bundles</span>
        <h2 className="h-section">Buy them in <em className="italic-mark">threes</em>.</h2>
      </div>
      <div className="right">
        <span className="muted" style={{ fontSize: 13 }}>Free shipping over ₹999 · COD available</span>
      </div>
    </div>

    <div className="bundles">
      {BUNDLES.map((b, i) => (
        <div key={i} className={`bundle ${b.featured ? "featured" : ""}`}>
          <span className="save">{b.save}</span>
          <div className="tier-label">{b.tag}</div>
          <h3 className="tier-name">{b.name}</h3>

          <div className="visual ph">
            <span className="ph-label">[ {b.name} · folded stack ]</span>
            <span className="ph-corner">GF · BUNDLE 0{i+1}</span>
          </div>

          <p className={b.featured ? "muted-x" : "muted"} style={{ margin: "0 0 18px", fontSize: 14 }}>{b.desc}</p>

          <ul>
            {b.list.map((it, j) => (
              <li key={j}><span className="tick"><Icon name="check" size={14} sw={1.4} /></span>{it}</li>
            ))}
          </ul>

          <div className="price-row">
            <span className="price-now">₹{b.price}</span>
            <span className="price-then">₹{b.was}</span>
          </div>

          <button className="cta" onClick={() => onAdd({
            id: `bundle-${i}`,
            name: `${b.name} Bundle`,
            range: b.tag,
            colorNote: "Mixed colour stories",
            pack: b.desc,
            code: `GF-BDL-0${i+1}`,
            price: b.price,
            was: b.was,
          })}>
            {b.cta} <Icon name="arrow" size={14} />
          </button>
        </div>
      ))}
    </div>
  </section>
);

const Stars = ({ n }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < n ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4">
        <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.3l6.1-.7L12 3Z" />
      </svg>
    ))}
  </span>
);

const Reviews = () => (
  <section className="section band" data-screen-label="07 Reviews">
    <div className="wrap">
      <div className="section-head">
        <div className="left">
          <span className="eyebrow">07 — Worn-in opinions<span className="dot"></span>Reviews</span>
          <h2 className="h-section">Quiet wins, in <em className="italic-mark">customers' words</em>.</h2>
        </div>
        <div className="right" style={{ alignItems: "baseline" }}>
          <div style={{ textAlign: "right" }}>
            <div className="serif" style={{ fontSize: 44, lineHeight: 1 }}>4.9</div>
            <Stars n={5} />
            <div className="muted" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", marginTop: 4 }}>1,284 reviews</div>
          </div>
        </div>
      </div>

      <div className="reviews">
        {REVIEWS.map((r, i) => (
          <div className="review" key={i}>
            <Stars n={r.stars} />
            <p className="quote">"{r.quote}"</p>
            <div className="who">
              <span className="name">{r.name}</span>
              <span className="loc">{r.loc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Gifting = () => (
  <section className="wrap section" data-screen-label="08 Gifting">
    <div className="gifting">
      <div className="visual ph">
        <span className="ph-label">[ Linen pouch · 3 folded pairs · hand-tied ]</span>
        <span className="ph-corner">GF · GIFT 01</span>
      </div>
      <div>
        <span className="eyebrow">08 — Gift & travel</span>
        <h3>The cleanest <em className="italic-mark">small gift</em> we know.</h3>
        <p>
          Hand-folded into a Gripfeet linen pouch. A premium-feeling
          essential that's quietly useful — for the friend who travels, the
          partner who's just got into Pilates, the parent on hardwood floors.
        </p>
        <ul>
          <li><span className="n">A</span>Hand-tied linen pouch</li>
          <li><span className="n">B</span>Personalised note card</li>
          <li><span className="n">C</span>Three-pair gift set</li>
          <li><span className="n">D</span>Free shipping worldwide</li>
        </ul>
        <div className="actions">
          <button className="btn btn-primary">Shop gifting <Icon name="arrow" size={14} /></button>
          <button className="btn btn-ghost">Build a custom set</button>
        </div>
      </div>
    </div>
  </section>
);

const Newsletter = () => {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSent(true);
  };
  return (
    <section className="wrap" data-screen-label="09 Newsletter">
      <div className="newsletter">
        <div>
          <span className="eyebrow">09 — Letters from the studio</span>
          <h3 style={{ marginTop: 18 }}>Drop your <em className="italic-mark">email</em>, get ₹200 off.</h3>
          <p>One quiet note a month — new colourways, studio drops, the occasional travel essentials list. No spam, no neon banners.</p>
        </div>
        <div>
          {!sent ? (
            <form onSubmit={submit}>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                Subscribe <Icon name="arrow" size={14} />
              </button>
            </form>
          ) : (
            <div className="success">Welcome in. Check your inbox — your ₹200 off is on its way.</div>
          )}
          <div className="fine">By subscribing you agree to receive marketing emails. Unsubscribe any time.</div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer" data-screen-label="10 Footer">
    <div className="wrap">
      <div className="footer-top">
        <div className="footer-brand">
          <Logo size="lg" />
          <p>Premium grip socks. Traction triumphs. Knit in India for studios, hardwood floors and long flights everywhere.</p>
          <div className="socials">
            <a href="#ig" aria-label="Instagram"><Icon name="ig" size={16} sw={1.4} /></a>
            <a href="#tt" aria-label="TikTok"><Icon name="tt" size={16} sw={1.4} /></a>
            <a href="#pn" aria-label="Pinterest"><Icon name="pin" size={16} sw={1.4} /></a>
            <a href="#wa" aria-label="WhatsApp"><Icon name="wa" size={14} /></a>
          </div>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="#ankle">Ankle · Mat Masters</a></li>
            <li><a href="#crew">Crew · Active Hold</a></li>
            <li><a href="#loafer">Loafer · Invisible Grip</a></li>
            <li><a href="#kids">Kids · Lil Steps</a></li>
            <li><a href="#bundles">Bundles</a></li>
            <li><a href="#gifting">Gifting</a></li>
          </ul>
        </div>

        <div>
          <h4>Help</h4>
          <ul>
            <li><a href="#ship">Shipping & delivery</a></li>
            <li><a href="#returns">All sales final</a></li>
            <li><a href="#cod">COD & payment</a></li>
            <li><a href="#size">Sizing guide</a></li>
            <li><a href="#care">Care & washing</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#story">Our story</a></li>
            <li><a href="#made">Made in India</a></li>
            <li><a href="#journal">Journal</a></li>
            <li><a href="#wholesale">Wholesale</a></li>
            <li><a href="#contact">Contact us</a></li>
            <li><a href="#press">Press</a></li>
          </ul>
        </div>

        <div>
          <h4>Coverage</h4>
          <ul>
            <li>Ships globally, 4–7 days</li>
            <li>Free shipping over ₹999</li>
            <li>COD available across India</li>
            <li>Quality guarantee on every pair</li>
            <li>EN · ₹ INR</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Gripfeet · Made in India</span>
        <span className="pay">
          <span>VISA</span><span>MC</span><span>AMEX</span><span>UPI</span><span>COD</span>
        </span>
        <span className="right">Privacy · Terms · Cookies</span>
      </div>
    </div>
  </footer>
);

// ----- Cart drawer -----
const CartDrawer = ({ open, items, onClose, onQty, onRemove }) => {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 999 ? 0 : 99;
  return (
    <>
      <div className={`drawer-bg ${open ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head">
          <span className="title">Your bag {items.length > 0 && <span className="muted" style={{ fontSize: 14, marginLeft: 6 }}>({items.length})</span>}</span>
          <button className="close" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="drawer-empty">
              <span className="ic"><Icon name="bag" size={20} /></span>
              <h4 className="serif" style={{ fontSize: 24, margin: 0 }}>Bag's empty.</h4>
              <p>Add a pair of MatMaster or build a three-pack to save 26%.</p>
              <button className="btn btn-primary" onClick={onClose}>Continue shopping <Icon name="arrow" size={14} /></button>
            </div>
          ) : (
            items.map((it, i) => (
              <div className="cart-line" key={it.lineId}>
                <Placeholder label="" code="" style={{ background: it.phBg || "#EFEEEA" }} className={it.phBg === "#1a1a1a" ? "ph-dark" : ""} />
                <div>
                  <div className="name">{it.name}</div>
                  <div className="var">{it.variant}</div>
                  <div className="qty">
                    <button onClick={() => onQty(it.lineId, -1)} aria-label="Decrease"><Icon name="minus" size={12} /></button>
                    <span>{it.qty}</span>
                    <button onClick={() => onQty(it.lineId, +1)} aria-label="Increase"><Icon name="plus" size={12} /></button>
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
            <div className="row">
              <span className="lbl">Subtotal</span>
              <span className="val">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="row" style={{ marginBottom: 18 }}>
              <span className="lbl">Shipping</span>
              <span className="muted" style={{ fontSize: 13 }}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <button className="btn btn-primary">Checkout — ₹{(subtotal + shipping).toLocaleString("en-IN")} <Icon name="arrow" size={14} /></button>
            <div className="fine">Ships in 1–2 days · All sales final · Quality guaranteed</div>
          </div>
        )}
      </aside>
    </>
  );
};

// ----- Floating WhatsApp -----
const WhatsApp = () => (
  <a className="wa" href="#wa-chat" aria-label="Chat on WhatsApp">
    <span className="wa-dot"></span>
    <Icon name="wa" size={14} />
    <span className="wa-label">Chat with us</span>
  </a>
);

Object.assign(window, {
  Story, USPSection, Palette, Bundles, Reviews, Gifting, Newsletter, Footer, CartDrawer, WhatsApp, Stars,
});

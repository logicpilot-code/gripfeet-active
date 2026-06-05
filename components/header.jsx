// Gripfeet ACTIVE — announcement bar, sticky nav, mobile drawer, logo

const Logo = ({ className = "", size = "sm" }) => (
  <img
    src="assets/gripfeet-logo-cropped.png"
    alt="Gripfeet"
    className={`gf-mark gf-mark-${size} ${className}`}
  />
);

const ANNOUNCE = [
  <>Launch pricing — up to <strong style={{fontWeight:700}}>39% off</strong> &nbsp;·&nbsp; <a href="Gripfeet.html#bundles">Shop bundles</a></>,
  <>Free shipping worldwide on orders over ₹999</>,
  <>Stretch Supima yarn &nbsp;·&nbsp; 100% silicone grip &nbsp;·&nbsp; Made in India</>,
  <>COD available across India &nbsp;·&nbsp; 4–7 day global delivery</>,
];

const Announcement = () => {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % ANNOUNCE.length), 4200);
    return () => clearInterval(t);
  }, []);
  const go = (d) => setI(p => (p + d + ANNOUNCE.length) % ANNOUNCE.length);
  return (
    <div className="announcement">
      <div className="announce-inner">
        <button className="arr" onClick={() => go(-1)} aria-label="Previous"><span style={{display:"inline-flex",transform:"scaleX(-1)"}}><Icon name="arrow" size={14} sw={1.6} /></span></button>
        <div className="announce-msg">{ANNOUNCE[i]}</div>
        <button className="arr" onClick={() => go(1)} aria-label="Next"><Icon name="arrow" size={14} sw={1.6} /></button>
      </div>
    </div>
  );
};

const NAV_LINKS = [
  { id: "ankle",  label: "Ankle",   href: "Collection.html?range=ankle" },
  { id: "crew",   label: "Crew",    href: "Collection.html?range=crew" },
  { id: "loafer", label: "Loafer",  href: "Collection.html?range=loafer" },
  { id: "kids",   label: "Kids",    href: "Collection.html?range=kids" },
  { id: "shop",   label: "All Socks", href: "Collection.html" },
  { id: "bundles", label: "Bundles", href: "Gripfeet.html#bundles" },
];

const Nav = ({ cartCount, onCart, onMenu, activeRoute = "home" }) => (
  <header className="nav">
    <div className="wrap nav-inner">
      <a href="Gripfeet.html" aria-label="Gripfeet home" style={{display:"inline-flex"}}><Logo /></a>

      <nav className="nav-links">
        {NAV_LINKS.map(l => (
          <a key={l.id} href={l.href} className={activeRoute === l.id ? "active" : ""}>{l.label}</a>
        ))}
      </nav>

      <div className="nav-right">
        <a className="txt-link" href="Gripfeet.html#story">Our Story</a>
        <button className="icon-btn" aria-label="Search"><Icon name="search" size={19} /></button>
        <button className="icon-btn" aria-label="Account"><Icon name="user" size={19} /></button>
        <button className="icon-btn" aria-label="Cart" onClick={onCart}>
          <Icon name="bag" size={19} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
        <button className="nav-burger icon-btn" onClick={onMenu} aria-label="Open menu">
          <Icon name="menu" size={22} />
        </button>
      </div>
    </div>
  </header>
);

const MobileNav = ({ open, onClose }) => {
  const links = [
    { label: "Ankle",     href: "Collection.html?range=ankle" },
    { label: "Crew",      href: "Collection.html?range=crew" },
    { label: "Loafer",    href: "Collection.html?range=loafer" },
    { label: "Kids",      href: "Collection.html?range=kids" },
    { label: "All Socks", href: "Collection.html" },
    { label: "Bundles",   href: "Gripfeet.html#bundles" },
    { label: "Our Story", href: "Gripfeet.html#story" },
  ];
  return (
    <div className={`mnav ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="mnav-head">
        <Logo />
        <button className="icon-btn" onClick={onClose} aria-label="Close menu"><Icon name="close" size={22} /></button>
      </div>
      <ul>
        {links.map(l => (
          <li key={l.label}><a href={l.href} onClick={onClose}>{l.label}<span className="go"><Icon name="arrow" size={18} /></span></a></li>
        ))}
      </ul>
      <div className="mfoot">
        <span>EN · ₹ INR</span>
        <span style={{marginLeft:"auto"}}>Account</span>
      </div>
    </div>
  );
};

Object.assign(window, { Announcement, Nav, MobileNav, Logo });

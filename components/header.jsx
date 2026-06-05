// Gripfeet — top of page: announcement bar, sticky nav, mobile drawer

const Announcement = () => {
  const items = [
    "Free shipping worldwide",
    "Made in India",
    "Launch pricing — up to 39% off",
    "COD available across India",
    "4–7 day global delivery",
    "Stretch Supima · 100% silicone grip",
  ];
  const loop = [...items, ...items];
  return (
    <div className="announcement">
      <div className="ticker">
        {loop.map((t, i) => (
          <React.Fragment key={i}>
            <span>{t}</span>
            <span className="sep">/</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Wordmark — official Gripfeet logo (PNG).
const Logo = ({ className = "", size = "sm" }) => (
  <img
    src="assets/gripfeet-logo-cropped.png"
    alt="Gripfeet"
    className={`gf-mark gf-mark-${size} ${className}`}
  />
);

const Nav = ({ cartCount, onCart, onMenu, activeRoute = "home" }) => {
  const links = [
    { id: "shop",   label: "Shop" },
    { id: "ankle",  label: "Ankle" },
    { id: "crew",   label: "Crew" },
    { id: "loafer", label: "Loafer" },
    { id: "kids",   label: "Kids" },
    { id: "story",  label: "Story" },
  ];
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <nav className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={activeRoute === l.id ? "active" : ""}>{l.label}</a>
          ))}
        </nav>
        <button className="nav-burger icon-btn" onClick={onMenu} aria-label="Open menu">
          <Icon name="menu" size={20} />
        </button>
        <Logo />
        <div className="nav-icons">
          <button className="icon-btn" aria-label="Search">
            <Icon name="search" size={18} />
          </button>
          <button className="icon-btn" aria-label="Account">
            <Icon name="user" size={18} />
          </button>
          <button className="icon-btn" aria-label="Cart" onClick={onCart}>
            <Icon name="bag" size={18} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

const MobileNav = ({ open, onClose }) => {
  const links = ["Shop", "Ankle", "Crew", "Loafer", "Kids", "Bundles", "Story", "Journal"];
  return (
    <div className={`mnav ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="mnav-head">
        <Logo />
        <button className="icon-btn" onClick={onClose} aria-label="Close menu">
          <Icon name="close" size={20} />
        </button>
      </div>
      <ul>
        {links.map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} onClick={onClose}>{l}</a></li>
        ))}
      </ul>
      <div className="foot">
        <span>EN · ₹ INR</span>
        <span style={{marginLeft:"auto"}}>Account</span>
      </div>
    </div>
  );
};

Object.assign(window, { Announcement, Nav, MobileNav, Logo });

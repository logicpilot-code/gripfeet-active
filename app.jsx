// Gripfeet ACTIVE — main composer

const phToneCart = (id) => id.includes("crew") ? "#16160F" : id.includes("kid") ? "#F2EBDF" : "#F3F0E8";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "blue",
  "showAnnouncement": true,
  "showStatement": true,
  "showTrends": true,
  "showPalette": true
}/*EDITMODE-END*/;

const ACCENTS = ["blue", "lime", "red", "navy"];

const App = () => {
  const [tw, setTweak] = (window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}]);

  React.useEffect(() => {
    const html = document.documentElement;
    ACCENTS.forEach(a => html.classList.remove(`acc-${a}`));
    html.classList.add(`acc-${tw.accent || "blue"}`);
  }, [tw.accent]);

  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [qv, setQv] = React.useState({ open: false, product: null });

  React.useEffect(() => {
    document.body.classList.toggle("no-scroll", cartOpen || menuOpen || qv.open);
  }, [cartOpen, menuOpen, qv.open]);

  const addToCart = (product, opts = {}) => {
    const size = opts.size || "M";
    const lineId = `${product.id}-${size}`;
    setCart(prev => {
      const existing = prev.find(x => x.lineId === lineId);
      if (existing) return prev.map(x => x.lineId === lineId ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, {
        lineId, id: product.id, name: product.name,
        variant: `${product.pack} · ${product.colorNote}${opts.size ? ` · Size ${opts.size}` : ""}`,
        phTone: phToneCart(product.id),
        phDark: product.id.includes("crew"),
        price: product.price, qty: 1,
      }];
    });
    setCartOpen(true);
    setQv({ open: false, product: null });
  };

  const qty = (lineId, delta) => setCart(prev => prev.map(x => x.lineId === lineId ? { ...x, qty: Math.max(0, x.qty + delta) } : x).filter(x => x.qty > 0));
  const remove = (lineId) => setCart(prev => prev.filter(x => x.lineId !== lineId));
  const totalItems = cart.reduce((s, it) => s + it.qty, 0);
  const scrollToShop = () => window.scrollTo({ top: (document.getElementById("shop")?.offsetTop || 0) - 70, behavior: "smooth" });

  return (
    <>
      {tw.showAnnouncement !== false && <Announcement />}
      <Nav cartCount={totalItems} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} />
      <main>
        <Hero onShop={scrollToShop} />
        <Trust />
        <ShopByHeight />
        {tw.showStatement !== false && <Statement />}
        <FeaturedCarousel onAdd={(p) => addToCart(p)} />
        {tw.showTrends !== false && <ShopTrends />}
        <Story />
        <USPSection />
        {tw.showPalette !== false && <Palette />}
        <Bundles onAdd={(b) => addToCart(b)} />
        <Reviews />
        <MoveBand />
        <Gifting />
        <Newsletter />
      </main>
      <Footer />

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={qty} onRemove={remove} />
      <QuickView open={qv.open} product={qv.product} onClose={() => setQv({ open: false, product: null })} onAdd={addToCart} />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <WhatsApp />

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Accent colour">
            <window.TweakRadio
              label="Athletic pop"
              value={tw.accent || "blue"}
              onChange={(v) => setTweak("accent", v)}
              options={[
                { value: "blue", label: "Blue" },
                { value: "lime", label: "Lime" },
                { value: "red",  label: "Red" },
                { value: "navy", label: "Navy" },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection label="Sections">
            <window.TweakToggle label="Announcement bar" value={tw.showAnnouncement !== false} onChange={(v) => setTweak("showAnnouncement", v)} />
            <window.TweakToggle label="Two-tone statement" value={tw.showStatement !== false} onChange={(v) => setTweak("showStatement", v)} />
            <window.TweakToggle label="Shop the ranges (editorial)" value={tw.showTrends !== false} onChange={(v) => setTweak("showTrends", v)} />
            <window.TweakToggle label="Signature palette" value={tw.showPalette !== false} onChange={(v) => setTweak("showPalette", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
};

window.App = App;
const __gfRoot = document.getElementById("root");
if (__gfRoot) ReactDOM.createRoot(__gfRoot).render(<App />);

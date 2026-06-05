// Gripfeet — main composer

const phBgFor = (product) =>
  product.id.startsWith("crew") ? "#1a1a1a"
  : product.id.startsWith("kid") ? "#F2EBDF"
  : product.id.startsWith("bundle") ? "#EFEEEA"
  : "#EFEEEA";

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineFont": "instrument",
  "logoStyle": "grotesk",
  "ctaStyle": "black",
  "showAnnouncement": true,
  "showPalette": true
}/*EDITMODE-END*/;

const FONT_OPTIONS = [
  { id: "instrument", label: "Instrument Serif", note: "Quiet editorial" },
  { id: "cormorant",  label: "Cormorant Garamond", note: "Heritage Garamond" },
  { id: "caslon",     label: "Libre Caslon Display", note: "Country house" },
  { id: "bodoni",     label: "Bodoni Moda", note: "Fashion-house" },
];

const App = () => {
  const [tw, setTweak] = (window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}]);

  // Apply tweak classes to <html>
  React.useEffect(() => {
    const html = document.documentElement;
    FONT_OPTIONS.forEach(o => html.classList.remove(`font-${o.id}`));
    html.classList.add(`font-${tw.headlineFont}`);
    html.classList.remove("mark-grotesk", "mark-serif");
    html.classList.add(`mark-${tw.logoStyle}`);
    html.classList.remove("cta-taupe");
    if (tw.ctaStyle === "taupe") html.classList.add("cta-taupe");
  }, [tw.headlineFont, tw.logoStyle, tw.ctaStyle]);

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
      if (existing) {
        return prev.map(x => x.lineId === lineId ? { ...x, qty: x.qty + 1 } : x);
      }
      return [
        ...prev,
        {
          lineId,
          id: product.id,
          name: product.name,
          variant: `${product.pack} · ${product.colorNote}${opts.size ? ` · Size ${opts.size}` : ""}`,
          phBg: phBgFor(product),
          price: product.price,
          qty: 1,
        },
      ];
    });
    setCartOpen(true);
    setQv({ open: false, product: null });
  };

  const qty = (lineId, delta) => {
    setCart(prev => prev
      .map(x => x.lineId === lineId ? { ...x, qty: Math.max(0, x.qty + delta) } : x)
      .filter(x => x.qty > 0)
    );
  };
  const remove = (lineId) => setCart(prev => prev.filter(x => x.lineId !== lineId));

  const totalItems = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <>
      {tw.showAnnouncement !== false && <Announcement />}
      <Nav
        cartCount={totalItems}
        onCart={() => setCartOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />
      <main>
        <Hero onShop={() => window.scrollTo({ top: (document.getElementById("shop")?.offsetTop || 0) - 80, behavior: "smooth" })} />
        <Trust />
        <Categories />
        <Marquee />
        <Featured
          onQuickView={(p) => setQv({ open: true, product: p })}
          onAdd={(p) => addToCart(p)}
        />
        <Story />
        <USPSection />
        {tw.showPalette !== false && <Palette />}
        <Bundles onAdd={(b) => addToCart(b)} />
        <Reviews />
        <Gifting />
        <Newsletter />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={qty}
        onRemove={remove}
      />
      <QuickView
        open={qv.open}
        product={qv.product}
        onClose={() => setQv({ open: false, product: null })}
        onAdd={addToCart}
      />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <WhatsApp />

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Typography">
            <window.TweakSelect
              label="Headline serif"
              value={tw.headlineFont}
              onChange={(v) => setTweak("headlineFont", v)}
              options={FONT_OPTIONS.map(o => ({ value: o.id, label: `${o.label} — ${o.note}` }))}
            />
          </window.TweakSection>
          <window.TweakSection label="Brand mark">
            <window.TweakRadio
              label="Logo"
              value={tw.logoStyle}
              onChange={(v) => setTweak("logoStyle", v)}
              options={[
                { value: "grotesk", label: "Grotesk" },
                { value: "serif",   label: "Serif" },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection label="CTAs & accent">
            <window.TweakRadio
              label="Primary button"
              value={tw.ctaStyle}
              onChange={(v) => setTweak("ctaStyle", v)}
              options={[
                { value: "black", label: "Black" },
                { value: "taupe", label: "Taupe" },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection label="Layout">
            <window.TweakToggle
              label="Announcement ticker"
              value={tw.showAnnouncement !== false}
              onChange={(v) => setTweak("showAnnouncement", v)}
            />
            <window.TweakToggle
              label="Signature palette section"
              value={tw.showPalette !== false}
              onChange={(v) => setTweak("showPalette", v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
};

window.App = App;
const __gfRoot = document.getElementById("root");
if (__gfRoot) {
  ReactDOM.createRoot(__gfRoot).render(<App />);
}

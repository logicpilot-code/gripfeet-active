// PDP app composer — minimal cart shell, no homepage sections.

const TWEAK_DEFAULTS_PDP = /*EDITMODE-BEGIN*/{
  "headlineFont": "instrument",
  "logoStyle": "grotesk",
  "ctaStyle": "black"
}/*EDITMODE-END*/;

const FONT_OPTIONS_PDP = [
  { id: "instrument", label: "Instrument Serif" },
  { id: "cormorant",  label: "Cormorant Garamond" },
  { id: "caslon",     label: "Libre Caslon Display" },
  { id: "bodoni",     label: "Bodoni Moda" },
];

const PDPApp = () => {
  const [tw, setTweak] = (window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS_PDP) : [TWEAK_DEFAULTS_PDP, () => {}]);

  React.useEffect(() => {
    const html = document.documentElement;
    FONT_OPTIONS_PDP.forEach(o => html.classList.remove(`font-${o.id}`));
    html.classList.add(`font-${tw.headlineFont}`);
    html.classList.remove("mark-grotesk", "mark-serif");
    html.classList.add(`mark-${tw.logoStyle}`);
    html.classList.remove("cta-taupe");
    if (tw.ctaStyle === "taupe") html.classList.add("cta-taupe");
  }, [tw.headlineFont, tw.logoStyle, tw.ctaStyle]);

  // Cart state (minimal, shared shape with homepage)
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle("no-scroll", cartOpen || menuOpen);
  }, [cartOpen, menuOpen]);

  // ---------- Resolve product from URL ----------
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("product") || "ank-soft-studio";
  const product = PRODUCTS.find(p => p.id === requested) || PRODUCTS.find(p => p.id === "ank-soft-studio");

  // ---------- Update title ----------
  React.useEffect(() => {
    document.title = `${product.name} — ${product.range} · Gripfeet`;
  }, [product]);

  const totalItems = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <>
      <Announcement />
      <Nav
        cartCount={totalItems}
        onCart={() => setCartOpen(true)}
        onMenu={() => setMenuOpen(true)}
      />
      <main>
        <PDP product={product} />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onQty={() => {}}
        onRemove={() => {}}
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
              options={FONT_OPTIONS_PDP.map(o => ({ value: o.id, label: o.label }))}
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
              label="Primary"
              value={tw.ctaStyle}
              onChange={(v) => setTweak("ctaStyle", v)}
              options={[
                { value: "black", label: "Black" },
                { value: "taupe", label: "Taupe" },
              ]}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PDPApp />);

// Gripfeet ACTIVE — PDP page composer

const phToneCartPdp = (id) => id.includes("crew") ? "#16160F" : id.includes("kid") ? "#F2EBDF" : "#F3F0E8";

const PDPApp = () => {
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle("no-scroll", cartOpen || menuOpen);
  }, [cartOpen, menuOpen]);

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("product") || "ank-soft-studio";
  const product = PRODUCTS.find((p) => p.id === requested) || PRODUCTS.find((p) => p.id === "ank-soft-studio");

  React.useEffect(() => { document.title = `${product.name} — ${product.range} · Gripfeet`; }, [product]);

  const addToCart = (prod, opts = {}) => {
    const size = opts.size || "M";
    const packLabel = opts.packLabel || prod.pack;
    const unitPrice = opts.price || prod.price;
    const colour = opts.colour || prod.colorNote;
    const lineId = `${prod.id}-${size}-${packLabel}-${colour}`;
    const addQty = opts.qty || 1;
    setCart((prev) => {
      const existing = prev.find((x) => x.lineId === lineId);
      if (existing) return prev.map((x) => x.lineId === lineId ? { ...x, qty: x.qty + addQty } : x);
      return [...prev, {
        lineId, id: prod.id, name: prod.name,
        variant: `${packLabel} · ${colour} · Size ${size}`,
        phTone: phToneCartPdp(prod.id), phDark: prod.id.includes("crew"),
        price: unitPrice, qty: addQty,
      }];
    });
    setCartOpen(true);
  };
  const qty = (lineId, d) => setCart((prev) => prev.map((x) => x.lineId === lineId ? { ...x, qty: Math.max(0, x.qty + d) } : x).filter((x) => x.qty > 0));
  const remove = (lineId) => setCart((prev) => prev.filter((x) => x.lineId !== lineId));
  const totalItems = cart.reduce((s, it) => s + it.qty, 0);

  return (
    <>
      <Announcement />
      <Nav cartCount={totalItems} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} />
      <main>
        <PDP product={product} onAdd={addToCart} />
      </main>
      <Footer />

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={qty} onRemove={remove} />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <WhatsApp />
    </>
  );
};

const __pdpRoot = document.getElementById("root");
if (__pdpRoot) ReactDOM.createRoot(__pdpRoot).render(<PDPApp />);

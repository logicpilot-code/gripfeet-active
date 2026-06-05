// Gripfeet ACTIVE — Collection page composer (cart shell + filter UI)

const phToneCartCol = (id) => id.includes("crew") ? "#16160F" : id.includes("kid") ? "#F2EBDF" : "#F3F0E8";

const CollectionApp = () => {
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.classList.toggle("no-scroll", cartOpen || menuOpen);
  }, [cartOpen, menuOpen]);

  const addToCart = (product, opts = {}) => {
    const size = opts.size || "M";
    const lineId = `${product.id}-${size}`;
    setCart((prev) => {
      const existing = prev.find((x) => x.lineId === lineId);
      if (existing) return prev.map((x) => x.lineId === lineId ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, {
        lineId, id: product.id, name: product.name,
        variant: `${product.pack} · ${product.colorNote}`,
        phTone: phToneCartCol(product.id), phDark: product.id.includes("crew"),
        price: product.price, qty: 1,
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
      <Nav cartCount={totalItems} onCart={() => setCartOpen(true)} onMenu={() => setMenuOpen(true)} activeRoute="shop" />
      <main>
        <Collection onAdd={addToCart} />
      </main>
      <Footer />

      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={qty} onRemove={remove} />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <WhatsApp />
    </>
  );
};

const __colRoot = document.getElementById("root");
if (__colRoot) ReactDOM.createRoot(__colRoot).render(<CollectionApp />);

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCart, cartStore } from "@/lib/cart-store";

const links = ["Perfumes", "Handbags", "Sandals", "Story", "Journal"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const cart = useCart();
  const count = cart.items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-luxe ${
        scrolled ? "py-3 glass" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-(--spacing-content-px) flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">
            Girly <span className="gradient-gold font-medium">Goodies</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors relative group"
            >
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500 ease-luxe" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            className="p-2.5 hover:text-accent transition-colors hidden sm:flex"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-2.5 hover:text-accent transition-colors hidden sm:flex"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
          </button>
          <button
            onClick={() => cartStore.setOpen(true)}
            className="p-2.5 hover:text-accent transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full gradient-rose text-[10px] flex items-center justify-center text-white font-medium"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button className="p-2.5 lg:hidden" onClick={() => setMobile(!mobile)} aria-label="Menu">
            {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden glass mt-3"
          >
            <div className="px-(--spacing-content-px) py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobile(false)}
                  className="font-display text-2xl"
                >
                  {l}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

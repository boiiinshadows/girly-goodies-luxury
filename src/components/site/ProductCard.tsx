import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Heart, Star, Plus, Eye } from "lucide-react";
import type { Product } from "@/lib/products";
import { cartStore, useCart } from "@/lib/cart-store";
import { revealUp, ease } from "@/lib/animations";

export function ProductCard({
  product,
  onQuickView,
  index = 0,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
  index?: number;
}) {
  const cart = useCart();
  const liked = cart.wishlist.includes(product.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);

  // Spring-based 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 200, damping: 20 });
  const springTiltY = useSpring(tiltY, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-6, 6]);

  // Spotlight position for glare effect
  const glareX = useTransform(springTiltX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springTiltY, [-0.5, 0.5], [100, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const handleAddToCart = () => {
    cartStore.addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      variants={revealUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className="group relative will-change-transform"
    >
      {/* Ambient glow behind card */}
      <div className="absolute -inset-2 rounded-[1.75rem] bg-accent/0 group-hover:bg-accent/[0.06] blur-2xl transition-colors duration-700" />

      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-soft group-hover:shadow-luxe transition-shadow duration-700">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover img-zoom"
        />

        {/* Glassmorphism overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glare / spotlight effect on hover */}
        <motion.div
          style={{ left: glareX, top: glareY }}
          className="absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-4 left-4 glass label-xs px-3.5 py-1.5 rounded-full shadow-soft">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => cartStore.toggleWishlist(product.id)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${liked ? "fill-accent text-accent" : ""}`}
          />
        </button>

        {/* Hover action bar */}
        <div className="hover-reveal absolute inset-x-4 bottom-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 glass-dark text-background py-3.5 rounded-full label-xs flex items-center justify-center gap-2 hover:bg-foreground transition-colors duration-500"
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="done"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center gap-2"
                >
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 12l5 5L20 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: ease.outExpo }}
                    />
                  </motion.svg>
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="px-4 glass rounded-full label-xs hover:bg-background transition-colors duration-500 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> View
            </button>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="label-muted">{product.category}</div>
          <h3 className="font-display text-xl mt-1.5 truncate tracking-tight">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${s < Math.round(product.rating) ? "fill-accent text-accent" : "fill-muted-foreground/20 text-muted-foreground/20"}`}
                />
              ))}
            </div>
            <span className="text-xs text-foreground/50 ml-0.5">{product.rating}</span>
          </div>
        </div>
        <div className="font-display text-xl text-right shrink-0 tracking-tight">
          ${product.price}
        </div>
      </div>
    </motion.div>
  );
}

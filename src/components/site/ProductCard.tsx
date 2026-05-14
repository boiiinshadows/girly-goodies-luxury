import { motion } from "framer-motion";
import { Heart, Star, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { cartStore, useCart } from "@/lib/cart-store";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
}) {
  const cart = useCart();
  const liked = cart.wishlist.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-soft hover:shadow-luxe transition-shadow duration-700">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="w-full h-full object-cover img-zoom"
        />

        {product.badge && (
          <span className="absolute top-4 left-4 glass label-xs px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        <button
          onClick={() => cartStore.toggleWishlist(product.id)}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-accent text-accent" : ""}`} />
        </button>

        <div className="hover-reveal absolute inset-x-4 bottom-4 flex gap-2">
          <button
            onClick={() => cartStore.addToCart(product)}
            className="flex-1 glass-dark text-background py-3 rounded-full label-xs flex items-center justify-center gap-2 hover:bg-foreground transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add to Cart
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="px-4 glass rounded-full label-xs hover:bg-background transition-colors"
            >
              View
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="label-muted">{product.category}</div>
          <h3 className="font-display text-xl mt-1 truncate">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-foreground/60">
            <Star className="w-3 h-3 fill-accent text-accent" />
            {product.rating}
          </div>
        </div>
        <div className="font-display text-xl text-right shrink-0">${product.price}</div>
      </div>
    </motion.div>
  );
}

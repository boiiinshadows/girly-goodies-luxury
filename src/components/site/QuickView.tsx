import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, Star, Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { cartStore, useCart } from "@/lib/cart-store";
import { ease } from "@/lib/animations";

export function QuickView({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const cart = useCart();
  const liked = product ? cart.wishlist.includes(product.id) : false;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.5, ease: ease.luxe }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[71] w-full max-w-[900px] max-h-[88vh] overflow-y-auto bg-background rounded-3xl shadow-luxe"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 w-11 h-11 rounded-full glass flex items-center justify-center z-10 hover:scale-105 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="grid md:grid-cols-2 gap-0">
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: ease.luxe }}
                className="aspect-square md:aspect-auto bg-muted overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: ease.luxe }}
                className="p-8 lg:p-10 flex flex-col"
              >
                <div className="label-accent">{product.category}</div>
                <h3 className="font-display text-4xl mt-3">{product.name}</h3>
                <div className="flex items-center gap-3 mt-3 text-sm text-foreground/60">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" /> {product.rating}
                  </div>
                  <span>·</span>
                  <span>In stock</span>
                </div>
                <div className="font-display text-3xl mt-4">${product.price}</div>
                <p className="mt-6 text-foreground/70 leading-relaxed">{product.description}</p>

                <div className="mt-auto pt-8 flex gap-3">
                  <button
                    onClick={() => {
                      cartStore.addToCart(product);
                      onClose();
                    }}
                    className="flex-1 bg-foreground text-background py-4 rounded-full label-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Plus className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={() => cartStore.toggleWishlist(product.id)}
                    aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={liked}
                    className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:border-accent transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${liked ? "fill-accent text-accent" : ""}`} />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

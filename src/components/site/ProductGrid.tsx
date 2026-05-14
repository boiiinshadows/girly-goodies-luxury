import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, type Category, type Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { revealUp, staggerContainer, ease } from "@/lib/animations";

const tabs = ["All", "Perfumes", "Handbags", "Sandals"] as const;
type Tab = (typeof tabs)[number];

export function ProductGrid({ onQuickView }: { onQuickView: (p: Product) => void }) {
  const [active, setActive] = useState<Tab>("All");
  const filtered =
    active === "All" ? products : products.filter((p) => p.category === (active as Category));

  return (
    <section id="perfumes" className="section-y px-(--spacing-content-px)">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.luxe }}
          className="text-center mb-14"
        >
          <div className="label-accent mb-3">Curated For You</div>
          <h2 className="font-display text-5xl lg:text-7xl">The Edit</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: ease.luxe }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-6 py-2.5 rounded-full label-xs transition-all duration-500 ${
                active === t
                  ? "bg-foreground text-background shadow-soft"
                  : "border border-foreground/15 hover:border-accent hover:text-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

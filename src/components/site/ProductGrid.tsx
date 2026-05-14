import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, type Category } from "@/lib/products";
import { ProductCard } from "./ProductCard";

const tabs = ["All", "Perfumes", "Handbags", "Sandals"] as const;
type Tab = typeof tabs[number];

export function ProductGrid({ onQuickView }: { onQuickView: (p: any) => void }) {
  const [active, setActive] = useState<Tab>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === (active as Category));

  return (
    <section id="perfumes" className="py-28 lg:py-36 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Curated For You</div>
          <h2 className="font-display text-5xl lg:text-7xl">The Edit</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-6 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all duration-500 ${
                active === t
                  ? "bg-foreground text-background shadow-soft"
                  : "border border-foreground/15 hover:border-accent hover:text-accent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

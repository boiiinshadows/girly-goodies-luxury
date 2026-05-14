import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bestSellers } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function BestSellers({ onQuickView }: { onQuickView: (p: any) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <section id="new" className="section-y bg-cream/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-(--spacing-content-px)">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="label-accent mb-3">Most Loved</div>
            <h2 className="font-display text-4xl lg:text-6xl">Best Sellers</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="w-12 h-12 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="w-12 h-12 rounded-full border border-foreground/20 hover:bg-foreground hover:text-background transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto pb-8 px-(--spacing-content-px) max-w-7xl mx-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {bestSellers.map((p) => (
          <div key={p.id} className="shrink-0 w-[280px] sm:w-[320px] snap-start">
            <ProductCard product={p} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    </section>
  );
}

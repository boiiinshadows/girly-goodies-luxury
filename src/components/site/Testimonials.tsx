import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { ease } from "@/lib/animations";

const reviews = [
  {
    name: "Amara L.",
    role: "Stylist · Lagos",
    text: "The Rose Éternelle is now part of who I am. Compliments every single day — it lingers like a secret.",
  },
  {
    name: "Sophia M.",
    role: "Editor · Milan",
    text: "I bought the Mademoiselle Quilted bag for a wedding and ended up wearing it daily. The leather is dreamy.",
  },
  {
    name: "Naomi R.",
    role: "Founder · NYC",
    text: "I have wide feet and the Crème Block Heels are the first I can wear all night. Soft luxury is real here.",
  },
  {
    name: "Elena V.",
    role: "Photographer · Paris",
    text: "Everything arrives wrapped like a gift to yourself. The whole experience feels intentional and beautiful.",
  },
];

const INTERVAL_MS = 5500;

export function Testimonials() {
  const [i, setI] = useState(0);

  const next = useCallback(() => setI((p) => (p + 1) % reviews.length), []);

  useEffect(() => {
    const t = setInterval(next, INTERVAL_MS);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="section-y px-(--spacing-content-px) gradient-luxe relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full bg-blush/20 blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.luxe }}
          className="text-center mb-14"
        >
          <div className="label-accent mb-3">Words of Love</div>
          <h2 className="font-display text-4xl lg:text-6xl">Worn by women like you</h2>
        </motion.div>

        <div className="relative h-[280px] sm:h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.7, ease: ease.luxe }}
              className="absolute inset-0 glass rounded-3xl p-8 lg:p-12 text-center flex flex-col justify-center items-center shadow-soft"
            >
              <Quote className="w-8 h-8 text-accent mb-5 opacity-60" />
              <p className="font-display text-2xl lg:text-3xl italic leading-snug text-balance">
                "{reviews[i].text}"
              </p>
              <div className="mt-6 text-sm tracking-wider">
                <span className="font-medium">{reviews[i].name}</span>
                <span className="text-foreground/50"> · {reviews[i].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className="flex justify-center gap-2 mt-8"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Review from ${reviews[idx].name}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === i ? "w-8 bg-foreground" : "w-2 bg-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

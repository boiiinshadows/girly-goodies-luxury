import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  { name: "Amara L.", role: "Stylist · Lagos", text: "The Rose Éternelle is now part of who I am. Compliments every single day — it lingers like a secret." },
  { name: "Sophia M.", role: "Editor · Milan", text: "I bought the Mademoiselle Quilted bag for a wedding and ended up wearing it daily. The leather is dreamy." },
  { name: "Naomi R.", role: "Founder · NYC", text: "I have wide feet and the Crème Block Heels are the first I can wear all night. Soft luxury is real here." },
  { name: "Elena V.", role: "Photographer · Paris", text: "Everything arrives wrapped like a gift to yourself. The whole experience feels intentional and beautiful." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % reviews.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-28 lg:py-36 px-6 gradient-luxe relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blush/20 blur-3xl" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-14">
          <div className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Words of Love</div>
          <h2 className="font-display text-4xl lg:text-6xl">Worn by women like you</h2>
        </div>

        <div className="relative h-[280px] sm:h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 glass rounded-3xl p-8 lg:p-12 text-center flex flex-col justify-center items-center shadow-soft"
            >
              <Quote className="w-8 h-8 text-accent mb-5 opacity-60" />
              <p className="font-display text-2xl lg:text-3xl italic leading-snug text-balance">
                “{reviews[i].text}”
              </p>
              <div className="mt-6 text-sm tracking-wider">
                <span className="font-medium">{reviews[i].name}</span>
                <span className="text-foreground/50"> · {reviews[i].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Review ${idx + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-foreground" : "w-2 bg-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

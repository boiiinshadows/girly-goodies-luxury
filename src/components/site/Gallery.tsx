import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/cat-perfume.jpg";
import g6 from "@/assets/cat-sandals.jpg";

const tiles = [
  { src: g1, span: "row-span-2" },
  { src: g2, span: "" },
  { src: g3, span: "" },
  { src: g4, span: "row-span-2" },
  { src: g5, span: "" },
  { src: g6, span: "" },
];

export function Gallery() {
  return (
    <section id="journal" className="py-28 lg:py-36 px-6 bg-cream/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-accent mb-3 flex items-center justify-center gap-2">
            <Instagram className="w-4 h-4" /> @girlygoodies
          </div>
          <h2 className="font-display text-4xl lg:text-6xl">Tagged with love</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[180px] md:grid-rows-[220px] gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {tiles.map((t, i) => (
            <motion.a
              href="#"
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${t.span}`}
            >
              <img src={t.src} alt="" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="w-7 h-7 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

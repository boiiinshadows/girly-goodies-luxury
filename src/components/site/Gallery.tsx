import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/cat-perfume.jpg";
import g6 from "@/assets/cat-sandals.jpg";
import { revealScale, staggerContainer, ease } from "@/lib/animations";

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
    <section id="journal" className="section-y px-(--spacing-content-px) bg-cream/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.luxe }}
          className="text-center mb-14"
        >
          <div className="label-accent mb-3 flex items-center justify-center gap-2">
            <Instagram className="w-4 h-4" /> @girlygoodies
          </div>
          <h2 className="font-display text-4xl lg:text-6xl">Tagged with love</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-[180px] md:grid-rows-[220px] gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {tiles.map((t, i) => (
            <motion.a
              href="#"
              key={i}
              variants={revealScale}
              className={`group relative overflow-hidden rounded-2xl shadow-soft ${t.span}`}
            >
              <img
                src={t.src}
                alt=""
                loading="lazy"
                width={1024}
                height={1024}
                className="w-full h-full object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="w-7 h-7 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

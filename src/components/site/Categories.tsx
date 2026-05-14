import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import perfume from "@/assets/cat-perfume.jpg";
import handbag from "@/assets/cat-handbag.jpg";
import sandals from "@/assets/cat-sandals.jpg";

const cats = [
  { name: "Perfumes", tag: "Olfactive Poetry", img: perfume, href: "#perfumes" },
  { name: "Handbags", tag: "Modern Heirlooms", img: handbag, href: "#handbags" },
  { name: "Sandals", tag: "Quiet Luxury", img: sandals, href: "#sandals" },
];

export function Categories() {
  return (
    <section id="collection" className="py-28 lg:py-40 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-accent mb-4">The Maison</div>
            <h2 className="font-display text-5xl lg:text-7xl text-balance leading-[1]">
              Three rituals.<br />
              <span className="italic">One signature.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-foreground/60 leading-relaxed">
            From the first spritz to the last step — every piece is shaped by hand
            and made to be worn for a lifetime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cats.map((c, i) => (
            <CategoryCard key={c.name} {...c} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ name, tag, img, href, delay }: { name: string; tag: string; img: string; href: string; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${-y * 8}deg`);
    el.style.setProperty("--ry", `${x * 8}deg`);
  };
  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-luxe transition-all duration-700 ease-luxe"
      style={{
        transform: "perspective(1200px) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.7s",
      }}
    >
      <img
        src={img}
        alt={name}
        loading="lazy"
        width={1024}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-rose-gold/20 to-blush/10" />

      <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
        <div className="text-[10px] tracking-[0.3em] uppercase text-background/70 mb-2">{tag}</div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-4xl lg:text-5xl">{name}</h3>
          <span className="w-11 h-11 rounded-full glass flex items-center justify-center text-background group-hover:rotate-45 transition-transform duration-700 ease-luxe">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

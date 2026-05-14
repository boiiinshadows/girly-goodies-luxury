import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import perfume from "@/assets/cat-perfume.jpg";
import handbag from "@/assets/cat-handbag.jpg";
import sandals from "@/assets/cat-sandals.jpg";
import { revealUp, staggerContainer, ease } from "@/lib/animations";

const cats = [
  { name: "Perfumes", tag: "Olfactive Poetry", img: perfume, href: "#perfumes" },
  { name: "Handbags", tag: "Modern Heirlooms", img: handbag, href: "#handbags" },
  { name: "Sandals", tag: "Quiet Luxury", img: sandals, href: "#sandals" },
];

export function Categories() {
  return (
    <section id="collection" className="section-y-lg px-(--spacing-content-px) relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: ease.luxe }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="label-accent mb-4">The Maison</div>
            <h2 className="font-display text-5xl lg:text-7xl text-balance">
              Three rituals.
              <br />
              <span className="italic">One signature.</span>
            </h2>
          </div>
          <p className="md:max-w-sm text-foreground/60 leading-relaxed">
            From the first spritz to the last step — every piece is shaped by hand and made to be
            worn for a lifetime.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {cats.map((c, i) => (
            <CategoryCard key={c.name} {...c} delay={i * 0.15} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({
  name,
  tag,
  img,
  href,
  delay,
}: {
  name: string;
  tag: string;
  img: string;
  href: string;
  delay: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Spring-based tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 150, damping: 20 });
  const springY = useSpring(tiltY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      variants={revealUp}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className="group relative block aspect-[3/4] rounded-3xl overflow-hidden shadow-soft hover:shadow-luxe transition-shadow duration-700 ease-luxe will-change-transform"
    >
      <img
        src={img}
        alt={name}
        loading="lazy"
        width={1024}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover img-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-rose-gold/20 to-blush/10" />

      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-background">
        <div className="label-xs text-background/70 mb-2">{tag}</div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-3xl lg:text-5xl">{name}</h3>
          <span className="w-11 h-11 rounded-full glass flex items-center justify-center text-background group-hover:rotate-45 transition-transform duration-700 ease-luxe">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

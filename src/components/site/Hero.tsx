import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import heroPerfume from "@/assets/hero-perfume.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yProduct = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 30);
      my.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden gradient-luxe">
      {/* Layered backdrop blobs */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] -left-20 w-[500px] h-[500px] rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute bottom-[5%] -right-20 w-[600px] h-[600px] rounded-full bg-champagne/50 blur-3xl" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-rose-gold/20 blur-3xl" />
      </motion.div>

      {/* Floating particles */}
      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 lg:pt-44 pb-20 grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Text */}
        <motion.div style={{ opacity }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs tracking-[0.2em] uppercase text-foreground/70">New Season · Maison 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight text-balance"
          >
            Elegance
            <br />
            <span className="italic font-light">in every</span>{" "}
            <span className="gradient-gold font-medium">step.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="mt-8 text-base lg:text-lg text-foreground/65 max-w-md leading-relaxed"
          >
            Hand-curated perfumes, handbags and sandals for the woman who knows
            that confidence is the softest luxury of all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#collection"
              className="group relative overflow-hidden px-8 py-4 rounded-full bg-foreground text-background text-sm tracking-wide hover:shadow-luxe transition-all duration-700 ease-luxe"
            >
              <span className="relative z-10">Shop Collection</span>
              <span className="absolute inset-0 gradient-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxe" />
            </a>
            <a
              href="#new"
              className="group px-8 py-4 rounded-full border border-foreground/20 text-sm tracking-wide hover:border-accent hover:text-accent transition-all duration-500"
            >
              Explore New Arrivals
            </a>
          </motion.div>
        </motion.div>

        {/* Product image */}
        <motion.div
          style={{ y: yProduct, scale, x: sx, rotate: useTransform(sx, [-30, 30], [-3, 3]) }}
          className="relative aspect-[3/4] max-h-[80vh] mx-auto w-full max-w-md lg:max-w-none"
        >
          <motion.div style={{ y: sy }} className="absolute inset-0 animate-float">
            <div className="absolute inset-0 rounded-[3rem] gradient-rose blur-3xl opacity-40" />
            <img
              src={heroPerfume}
              alt="Signature crystal perfume bottle floating in champagne mist"
              width={1080}
              height={1920}
              className="relative w-full h-full object-cover rounded-[2.5rem] shadow-luxe"
            />
            <div className="absolute -bottom-6 -left-6 glass rounded-2xl px-5 py-4 shadow-soft">
              <div className="text-[10px] tracking-[0.2em] uppercase text-foreground/60">Signature Eau de Parfum</div>
              <div className="font-display text-2xl mt-1">Rose Éternelle</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const size = 2 + Math.random() * 4;
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 10 + Math.random() * 10;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-rose-gold/60 blur-[1px]"
            style={{
              left: `${left}%`,
              bottom: "-10px",
              width: size,
              height: size,
              animation: `drift ${duration}s linear ${delay}s infinite`,
              ["--dx" as never]: `${(Math.random() - 0.5) * 200}px`,
              ["--dy" as never]: `-${100 + Math.random() * 80}vh`,
            }}
          />
        );
      })}
    </div>
  );
}

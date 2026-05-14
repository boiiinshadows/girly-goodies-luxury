import { useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import heroPerfume from "@/assets/hero-perfume.jpg";
import bagImg from "@/assets/cat-handbag.jpg";
import sandalImg from "@/assets/cat-sandals.jpg";
import { ease, staggerHero, revealUp } from "@/lib/animations";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax layers at different depths
  const yBgDeep = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const yBgMid = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yBgNear = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const rotate = useTransform(sx, [-30, 30], [-2, 2]);

  // Product depth offsets for mouse
  const bagX = useTransform(sx, [-30, 30], [12, -12]);
  const sandalX = useTransform(sx, [-30, 30], [-12, 12]);
  const bagY = useTransform(sy, [-30, 30], [6, -6]);
  const sandalY = useTransform(sy, [-30, 30], [-6, 6]);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handle = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 30);
      my.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden gradient-luxe">
      {/* Deep parallax layer — large soft orbs */}
      <motion.div
        style={{ y: yBgDeep }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-[5%] -left-32 w-[700px] h-[700px] rounded-full bg-blush/30 blur-2xl md:blur-3xl" />
        <div className="absolute bottom-[0%] -right-32 w-[800px] h-[800px] rounded-full bg-champagne/30 blur-2xl md:blur-3xl" />
      </motion.div>

      {/* Mid parallax layer — medium orbs */}
      <motion.div
        style={{ y: yBgMid }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-[15%] left-[20%] w-[400px] h-[400px] rounded-full bg-rose-gold/15 blur-xl md:blur-3xl" />
        <div className="absolute bottom-[20%] right-[15%] w-[350px] h-[350px] rounded-full bg-blush/25 blur-xl md:blur-3xl" />
      </motion.div>

      {/* Near parallax layer — small accent glows */}
      <motion.div
        style={{ y: yBgNear }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute top-[30%] left-[50%] w-[200px] h-[200px] rounded-full bg-accent/10 blur-2xl" />
        <div className="absolute top-[60%] left-[10%] w-[150px] h-[150px] rounded-full bg-champagne/20 blur-2xl" />
      </motion.div>

      <Particles />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-(--spacing-content-px) pt-32 lg:pt-36 pb-20 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Text column */}
          <motion.div
            style={{ opacity }}
            variants={staggerHero}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-5 relative z-20"
          >
            <motion.div
              variants={revealUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="label-xs text-foreground/70">New Season · Maison 2026</span>
            </motion.div>

            <AnimatedHeading />

            <motion.p
              variants={revealUp}
              className="mt-8 text-base lg:text-lg text-foreground/65 max-w-md leading-relaxed"
            >
              Hand-curated perfumes, handbags and sandals for the woman who knows that confidence is
              the softest luxury of all.
            </motion.p>

            <motion.div variants={revealUp} className="mt-10 flex flex-wrap gap-4">
              <a
                href="#collection"
                className="group relative overflow-hidden px-8 py-4 rounded-full bg-foreground text-background text-sm tracking-wide hover:shadow-luxe transition-all duration-700 ease-luxe magnetic-zone"
              >
                <span className="relative z-10">Shop Collection</span>
                <span className="absolute inset-0 gradient-rose translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-luxe" />
              </a>
              <a
                href="#new"
                className="px-8 py-4 rounded-full border border-foreground/20 text-sm tracking-wide hover:border-accent hover:text-accent transition-all duration-500 magnetic-zone"
              >
                Explore New Arrivals
              </a>
            </motion.div>
          </motion.div>

          {/* Product trio — floating at different depths */}
          <motion.div
            style={{ scale, x: sx, rotate }}
            className="lg:col-span-7 relative will-change-transform"
          >
            <div className="relative h-[500px] sm:h-[560px] lg:h-[620px]">
              {/* Center — Perfume (front, largest) */}
              <motion.div
                style={{ y: sy }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[300px] lg:w-[340px] z-[30] will-change-transform"
              >
                <div className="animate-float will-change-transform">
                  <div className="absolute inset-0 rounded-[2.5rem] gradient-rose blur-3xl opacity-30 scale-110" />
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-luxe aspect-[3/4]">
                    <img
                      src={heroPerfume}
                      alt="Signature crystal perfume bottle"
                      width={1080}
                      height={1920}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass rounded-2xl px-5 py-3 shadow-soft whitespace-nowrap">
                    <div className="label-xs text-foreground/60">Signature Eau de Parfum</div>
                    <div className="font-display text-xl mt-0.5">Rose Éternelle</div>
                  </div>
                </div>
              </motion.div>

              {/* Left — Handbag (mid-depth, smaller) */}
              <motion.div
                style={{ x: bagX, y: bagY }}
                className="absolute left-[2%] sm:left-[5%] lg:left-[2%] top-[18%] sm:top-[15%] w-[180px] sm:w-[200px] lg:w-[220px] z-20 will-change-transform"
              >
                <div className="animate-float-gentle will-change-transform [animation-delay:-2s]">
                  <div className="absolute inset-0 rounded-[2rem] bg-blush/40 blur-2xl opacity-40 scale-110" />
                  <div className="relative rounded-[2rem] overflow-hidden shadow-soft aspect-[4/5]">
                    <img
                      src={bagImg}
                      alt="Designer handbag in blush lambskin"
                      width={1024}
                      height={1280}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <div className="label-xs text-foreground/50">Handbags</div>
                  </div>
                </div>
              </motion.div>

              {/* Right — Sandal (back depth, smaller) */}
              <motion.div
                style={{ x: sandalX, y: sandalY }}
                className="absolute right-[2%] sm:right-[5%] lg:right-[2%] top-[22%] sm:top-[18%] w-[170px] sm:w-[190px] lg:w-[210px] z-10 will-change-transform"
              >
                <div className="animate-float-gentle will-change-transform [animation-delay:-4s]">
                  <div className="absolute inset-0 rounded-[2rem] bg-champagne/40 blur-2xl opacity-40 scale-110" />
                  <div className="relative rounded-[2rem] overflow-hidden shadow-soft aspect-[4/5]">
                    <img
                      src={sandalImg}
                      alt="Elegant sandal in cream nappa"
                      width={1024}
                      height={1280}
                      loading="eager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <div className="label-xs text-foreground/50">Sandals</div>
                  </div>
                </div>
              </motion.div>

              {/* Ambient glow behind product trio */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50 z-20"
      >
        <span className="label-xs tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-foreground/30"
        />
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
}

/** Animated heading with word-by-word stagger */
function AnimatedHeading() {
  const words = [
    { text: "Elegance", className: "" },
    { text: "in every", className: "italic font-light" },
    { text: "step.", className: "gradient-gold font-medium" },
  ];

  const wordVariants = {
    hidden: { y: "110%" },
    visible: (i: number) => ({
      y: "0%",
      transition: { duration: 1.2, delay: i * 0.15, ease: ease.luxe },
    }),
  };

  return (
    <motion.h1
      variants={revealUp}
      className="font-display text-[clamp(2.8rem,7.5vw,7.5rem)] tracking-tight text-balance"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            custom={i}
            variants={wordVariants}
            className="inline-block"
          >
            <span className={word.className}>{word.text}</span>
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        size: 2 + Math.random() * 4,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        dx: `${(Math.random() - 0.5) * 200}px`,
        dy: `-${100 + Math.random() * 80}vh`,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-rose-gold/60 blur-[1px] hidden md:block"
          style={
            {
              left: `${p.left}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
              "--dx": p.dx,
              "--dy": p.dy,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import story from "@/assets/story.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import { animateCounter } from "@/lib/animations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      // Counter animations
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseInt(el.dataset.counter || "0", 10);
        const suffix = el.dataset.suffix || "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => animateCounter(el, target, 2000, "", suffix),
        });
      });

      // Decorative line draw
      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={ref}
      className="section-y-lg px-(--spacing-content-px) relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        <motion.div style={{ y: y1 }} className="lg:col-span-6 relative will-change-transform">
          <motion.div
            style={{ scale: imgScale }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxe will-change-transform"
          >
            <img
              src={story}
              alt="Woman holding luxury handbag"
              loading="lazy"
              width={1280}
              height={1600}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-12 -right-6 lg:-right-16 w-2/3 aspect-square rounded-3xl overflow-hidden shadow-luxe ring-8 ring-background will-change-transform"
          >
            <img
              src={gallery1}
              alt="Luxury accessories flat lay"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full gradient-rose blur-3xl opacity-30 -z-10 hidden md:block" />
        </motion.div>

        <div className="lg:col-span-6 lg:pl-10">
          <div data-reveal className="label-accent mb-5">
            Our Story
          </div>
          <h2 data-reveal className="font-display text-4xl lg:text-6xl text-balance">
            Crafted softly,
            <br />
            <span className="italic">worn boldly.</span>
          </h2>

          {/* Decorative line */}
          <div data-line className="mt-8 h-px w-16 bg-accent/40 origin-left" />

          <p data-reveal className="mt-8 text-foreground/65 leading-relaxed text-base lg:text-lg">
            Girly Goodies is a love letter to the modern woman — to the morning ritual, the
            late-night confidence, the perfume that becomes a memory. Each piece is sourced from
            small ateliers and shaped by hands that care.
          </p>
          <p data-reveal className="mt-5 text-foreground/65 leading-relaxed text-base lg:text-lg">
            Soft luxury. Quiet glamour. Made for a generation that gets to define elegance on its
            own terms.
          </p>

          <div data-reveal className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "12", v: "Ateliers", suffix: "+" },
              { k: "100", v: "Vegan leather", suffix: "%" },
              { k: "120", v: "Happy women", suffix: "k" },
            ].map((s) => (
              <div key={s.v}>
                <div
                  className="font-display text-3xl gradient-gold"
                  data-counter={s.k}
                  data-suffix={s.suffix}
                >
                  0{s.suffix}
                </div>
                <div className="text-xs tracking-wider text-foreground/55 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import story from "@/assets/story.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={ref} className="py-28 lg:py-44 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div style={{ y: y1 }} className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxe">
            <img src={story} alt="Woman holding luxury handbag" loading="lazy" width={1280} height={1600} className="w-full h-full object-cover" />
          </div>
          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-12 -right-6 lg:-right-16 w-2/3 aspect-square rounded-3xl overflow-hidden shadow-luxe ring-8 ring-background"
          >
            <img src={gallery1} alt="Luxury accessories flat lay" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
          </motion.div>

          {/* Decorative floating */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full gradient-rose blur-3xl opacity-30 -z-10" />
        </motion.div>

        <div className="lg:col-span-6 lg:pl-10">
          <div data-reveal className="text-xs tracking-[0.3em] uppercase text-accent mb-5">Our Story</div>
          <h2 data-reveal className="font-display text-4xl lg:text-6xl leading-[1.05] text-balance">
            Crafted softly,<br />
            <span className="italic">worn boldly.</span>
          </h2>
          <p data-reveal className="mt-8 text-foreground/65 leading-relaxed text-base lg:text-lg">
            Girly Goodies is a love letter to the modern woman — to the morning ritual,
            the late-night confidence, the perfume that becomes a memory. Each piece is
            sourced from small ateliers and shaped by hands that care.
          </p>
          <p data-reveal className="mt-5 text-foreground/65 leading-relaxed text-base lg:text-lg">
            Soft luxury. Quiet glamour. Made for a generation that gets to define
            elegance on its own terms.
          </p>

          <div data-reveal className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "12+", v: "Ateliers" },
              { k: "100%", v: "Vegan leather" },
              { k: "120k", v: "Happy women" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl gradient-gold">{s.k}</div>
                <div className="text-xs tracking-wider text-foreground/55 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

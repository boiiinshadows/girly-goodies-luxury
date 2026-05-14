import type { Variants, Transition } from "framer-motion";

// Shared easing curves
export const ease = {
  luxe: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

// Shared transition presets
export const transition = {
  luxe: { duration: 0.8, ease: ease.luxe } satisfies Transition,
  slow: { duration: 1.2, ease: ease.luxe } satisfies Transition,
  spring: { type: "spring", stiffness: 200, damping: 25 } satisfies Transition,
  springGentle: { type: "spring", stiffness: 120, damping: 20 } satisfies Transition,
};

// Cinematic fade-up reveal
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: ease.luxe },
  },
};

// Stagger container — children animate sequentially
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger with slower timing for hero sections
export const staggerHero: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Fade-in with slight scale
export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: ease.luxe },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.luxe },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.luxe },
  },
};

// Counter increment animation helper
export function animateCounter(
  el: HTMLElement,
  target: number,
  duration = 2000,
  prefix = "",
  suffix = "",
) {
  const start = performance.now();
  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = `${prefix}${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

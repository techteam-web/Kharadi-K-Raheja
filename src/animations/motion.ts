import type { Transition, Variants } from 'framer-motion';

/** Shared architectural easing — slow, confident, never bouncy. */
export const EASE_ARCHITECTURAL = [0.22, 1, 0.36, 1] as const;

export const transitionSlow: Transition = {
  duration: 0.6,
  ease: EASE_ARCHITECTURAL,
};

export const transitionBase: Transition = {
  duration: 0.45,
  ease: EASE_ARCHITECTURAL,
};

export const transitionFast: Transition = {
  duration: 0.3,
  ease: EASE_ARCHITECTURAL,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
  exit: { opacity: 0, y: -10, transition: transitionFast },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitionSlow },
  exit: { opacity: 0, transition: transitionBase },
};

export const staggerChildren = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_ARCHITECTURAL } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35, ease: EASE_ARCHITECTURAL } },
};

import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import gsap from 'gsap';

interface MagneticOptions {
  /** Fraction of the cursor's offset from center the element actually travels. */
  strength?: number;
  /** Scale applied while the cursor is over the element. */
  scale?: number;
}

/** Apple-dock-style magnetic pull — the element eases toward the cursor within its own bounds, then settles back on leave. */
export function useMagneticHover<T extends HTMLElement>({
  strength = 0.3,
  scale = 1,
}: MagneticOptions = {}): MutableRefObject<T | null> {
  // Cast to MutableRefObject so callers (e.g. Button's forwardRef merge) can assign .current directly.
  const ref = useRef<T | null>(null) as MutableRefObject<T | null>;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { willChange: 'transform' });
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    // quickTo can't reset the 'scale' shorthand cleanly — split into scaleX/scaleY instead.
    const scaleXTo = gsap.quickTo(el, 'scaleX', { duration: 0.4, ease: 'power3.out' });
    const scaleYTo = gsap.quickTo(el, 'scaleY', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const handleMouseEnter = () => {
      scaleXTo(scale);
      scaleYTo(scale);
    };
    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      scaleXTo(1);
      scaleYTo(1);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength, scale]);

  return ref;
}

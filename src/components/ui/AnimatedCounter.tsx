import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';

interface AnimatedCounterProps {
  /** e.g. "2.1M", "8.6 KM", "39M+", "100%", "1956" — a non-numeric value like "Grade A" renders as-is. */
  value: string;
}

function parseValue(value: string) {
  const match = value.match(/^(-?\d+(?:\.\d+)?)/);
  if (!match) return null;
  const number = parseFloat(match[1]);
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const suffix = value.slice(match[1].length);
  return { number, decimals, suffix };
}

/** Counts up from 0 the first time it scrolls into view — the rest of the value (unit, "+", etc.) stays static. */
export function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const parsed = useMemo(() => parseValue(value), [value]);

  useEffect(() => {
    const el = ref.current;
    if (!isInView || !parsed || !el) return;

    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: parsed.number,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = `${counter.val.toFixed(parsed.decimals)}${parsed.suffix}`;
      },
    });

    return () => {
      tween.kill();
    };
  }, [isInView, parsed]);

  if (!parsed) return <span ref={ref}>{value}</span>;

  return <span ref={ref}>{`${(0).toFixed(parsed.decimals)}${parsed.suffix}`}</span>;
}

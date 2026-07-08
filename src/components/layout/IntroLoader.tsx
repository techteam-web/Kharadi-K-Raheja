import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { fadeUp, staggerChildren } from '@/animations/motion';
import kRahejaLogo from '@/assets/k-raheja-logo.svg';

interface IntroLoaderProps {
  onDone: () => void;
  /** Fixed intro length in ms — deliberately not tied to real asset load state, so the
      rest of the app (route chunks, the orbit viewer's frames, etc.) loads in the
      background underneath for free during this window. */
  duration?: number;
}

const STATUS_PHRASES = ['Preparing', 'Loading visuals', 'Almost there'];

export function IntroLoader({ onDone, duration = 3000 }: IntroLoaderProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const phraseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tween = gsap.to(counter, {
      val: 100,
      duration: duration / 1000,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (barRef.current) barRef.current.style.width = `${counter.val}%`;
        if (percentRef.current) percentRef.current.textContent = `${Math.round(counter.val)}%`;
        if (phraseRef.current) {
          const idx = Math.min(STATUS_PHRASES.length - 1, Math.floor((counter.val / 100) * STATUS_PHRASES.length));
          phraseRef.current.textContent = STATUS_PHRASES[idx];
        }
      },
    });
    const timer = window.setTimeout(onDone, duration);
    return () => {
      tween.kill();
      window.clearTimeout(timer);
    };
  }, [duration, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="intro-loader-bg fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 px-6"
    >
      <motion.div
        variants={staggerChildren(0.15)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4"
      >
        <motion.img variants={fadeUp} src={kRahejaLogo} alt="K Raheja Corp" className="h-14 w-auto sm:h-16" />
        <motion.p variants={fadeUp} className="label-caps text-ink-muted">
          Kharadi 57
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex w-52 flex-col items-center gap-2.5 sm:w-64"
      >
        <div className="h-1 w-full overflow-hidden rounded-full bg-hairline">
          <div ref={barRef} className="h-full w-0 rounded-full bg-blue" />
        </div>
        <div className="flex w-full items-center justify-between">
          <span ref={phraseRef} className="label-caps text-ink-muted">
            {STATUS_PHRASES[0]}
          </span>
          <span ref={percentRef} className="label-caps text-ink-muted">
            0%
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

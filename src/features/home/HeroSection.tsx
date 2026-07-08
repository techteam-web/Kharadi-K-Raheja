import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeUp, staggerChildren } from '@/animations/motion';
import { OrbitViewer } from '@/features/panorama/OrbitViewer';
import kRahejaLogo from '@/assets/k-raheja-logo.svg';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-6%']);

  return (
    <section ref={ref} className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <OrbitViewer framePath="/orbit-frames" frameCount={72} autoRotate />
      </div>

      {/* Scrim behind the text only — pointer-events-none so drag reaches the orbit viewer beneath */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute top-6 left-6 z-10 sm:top-8 sm:left-10 lg:top-10 lg:left-20"
      >
        <img src={kRahejaLogo} alt="K Raheja Corp" className="h-10 w-auto sm:h-12 lg:h-14" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="pointer-events-none relative z-10 flex h-full w-full flex-col justify-end px-6 pb-16 sm:px-10 lg:px-20 lg:pb-24"
      >
        <motion.div variants={staggerChildren(0.12)} initial="hidden" animate="visible">
          <motion.p variants={fadeUp} className="label-caps text-paper/70">
            K Raheja Corp — Commercial
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-5xl leading-[0.95] text-paper text-balance sm:mt-6 sm:text-6xl lg:text-[5.5rem]"
          >
            Kharadi 57
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-lg font-display italic leading-snug text-paper/90 sm:mt-6 sm:text-xl lg:text-2xl"
          >
            Built for Tomorrow. Designed for Business.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}

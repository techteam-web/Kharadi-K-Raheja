import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerChildren } from '@/animations/motion';
import heroImage from '@/assets/images/hero.jpeg';

interface HeroSectionProps {
  onExplore: () => void;
  onViewLocation: () => void;
  onDownload: () => void;
}

export function HeroSection({ onExplore, onViewLocation, onDownload }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-6%']);

  return (
    <section ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div style={{ y: imageY, willChange: 'transform' }} className="absolute inset-0 h-[120%] w-full">
        <img
          src={heroImage}
          alt="Kharadi 57 — The Square, twin commercial towers at dusk"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Wash + vignette for text legibility over a bright architectural render */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-16 sm:px-10 lg:px-20 lg:pb-24"
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

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3 sm:mt-11 sm:gap-4">
            <Button variant="primary" onClick={onExplore}>
              Explore Experience
            </Button>
            <Button variant="secondary" onClick={onViewLocation} className="!border-paper/30 !text-paper hover:!border-paper">
              View Location
            </Button>
            <Button variant="accent" onClick={onDownload}>
              Download Brochure
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={onExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-9 left-6 z-10 hidden items-center gap-2 label-caps text-paper/60 hover:text-paper transition-colors duration-300 sm:left-10 md:flex lg:left-20"
      >
        Scroll to Explore
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}

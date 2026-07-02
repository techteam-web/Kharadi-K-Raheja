import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { IndiaMap } from '@/features/about/IndiaMap';
import { PAN_INDIA_CITIES } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function IndiaMapSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="grid h-full grid-cols-1 items-center gap-4 lg:grid-cols-2 lg:gap-10"
    >
      <div>
        <motion.div variants={fadeUp}>
          <SectionLabel tone="blue">Pan India Presence</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-3 font-display text-xl leading-tight text-ink text-balance sm:text-2xl lg:mt-6 lg:text-4xl"
        >
          A footprint spanning India&rsquo;s primary business gateways.
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-2 max-w-md text-xs leading-relaxed text-ink-muted sm:text-sm lg:mt-6 lg:text-lg">
          Commercial, hospitality, retail and residential developments across{' '}
          {PAN_INDIA_CITIES.length} of India&rsquo;s leading economic corridors.
        </motion.p>
      </div>
      <motion.div variants={fadeUp}>
        <IndiaMap />
      </motion.div>
    </motion.div>
  );
}

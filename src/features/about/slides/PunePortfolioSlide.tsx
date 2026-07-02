import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PuneCards } from '@/features/about/PuneCards';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function PunePortfolioSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel tone="blue">Pune Presence</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="mt-3 max-w-xl font-display text-xl leading-tight text-ink text-balance sm:text-2xl lg:mt-6 lg:text-4xl"
      >
        Kharadi 57 joins an established Pune portfolio.
      </motion.h2>

      <motion.div variants={fadeUp} className="mt-6 lg:mt-14">
        <PuneCards />
      </motion.div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { VISION_STATEMENT, CORE_PRINCIPLES } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function VisionSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel tone="blue">Vision</SectionLabel>
      </motion.div>
      <motion.p
        variants={fadeUp}
        className="mt-3 max-w-2xl font-display text-lg italic leading-snug text-ink text-balance sm:text-2xl lg:mt-6 lg:text-3xl"
      >
        &ldquo;{VISION_STATEMENT}&rdquo;
      </motion.p>

      <motion.div
        variants={staggerChildren(0.08)}
        className="mt-5 grid grid-cols-2 gap-4 border-t border-hairline pt-4 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:pt-10"
      >
        {CORE_PRINCIPLES.map((principle) => (
          <motion.div key={principle.id} variants={fadeUp}>
            <div className="font-display text-base text-ink sm:text-lg lg:text-xl">{principle.title}</div>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted sm:text-sm lg:mt-3">{principle.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

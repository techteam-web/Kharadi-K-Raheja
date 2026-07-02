import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TIMELINE } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function TimelineSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel tone="blue">Milestones</SectionLabel>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="mt-3 max-w-xl font-display text-xl leading-tight text-ink text-balance sm:text-2xl lg:mt-6 lg:text-4xl"
      >
        Seven decades, in brief.
      </motion.h2>

      <motion.div
        variants={staggerChildren(0.06)}
        className="relative mt-6 flex gap-8 overflow-x-auto pb-2 sm:gap-10 lg:mt-20 lg:justify-between lg:gap-0 lg:overflow-visible lg:pb-0"
      >
        <div className="absolute left-0 right-0 top-2 hidden h-px bg-hairline lg:block" />
        {TIMELINE.map((milestone) => (
          <motion.div
            key={milestone.year}
            variants={fadeUp}
            className="relative flex w-32 shrink-0 flex-col items-start sm:w-36 lg:w-[16.6667%]"
          >
            <span className="h-4 w-4 rounded-full border-2 border-paper bg-blue shadow" />
            <span className="mt-3 font-display text-lg text-ink sm:text-xl lg:mt-5 lg:text-2xl">{milestone.year}</span>
            <span className="mt-1.5 max-w-[95%] text-xs leading-snug text-ink-muted sm:text-sm lg:mt-2">
              {milestone.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { MediaPlate } from '@/components/ui/MediaPlate';
import { fadeUp, staggerChildren } from '@/animations/motion';
import type { EsgSection } from '@/types';

interface EsgStoryProps {
  section: EsgSection;
  index: number;
  reverse?: boolean;
}

export function EsgStory({ section, index, reverse }: EsgStoryProps) {
  return (
    <motion.section
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      className="grid grid-cols-1 items-center gap-8 border-t border-hairline py-10 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:gap-16 lg:py-20"
    >
      <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
        <MediaPlate tone="green" className="aspect-[16/9] w-full rounded-lg sm:aspect-[4/5]" />
      </div>
      <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
        <motion.span variants={fadeUp} className="label-caps text-green">
          {String(index).padStart(2, '0')} — ESG
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="mt-3 font-display text-3xl leading-[1.05] text-ink text-balance sm:mt-4 sm:text-4xl lg:mt-6 lg:text-5xl"
        >
          {section.title[0]}
          <br />
          {section.title[1]}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-5 sm:text-base lg:mt-7 lg:text-lg">
          {section.body}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-5 flex items-baseline gap-3 sm:mt-7 lg:mt-9">
          <span className="font-display text-3xl text-green sm:text-4xl">{section.metric.value}</span>
          <span className="label-caps text-ink-muted">{section.metric.label}</span>
        </motion.div>
      </div>
    </motion.section>
  );
}

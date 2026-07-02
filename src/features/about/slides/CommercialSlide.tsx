import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { MediaPlate } from '@/components/ui/MediaPlate';
import { COMMERCIAL_FEATURES } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function CommercialSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <motion.div variants={fadeUp}>
          <SectionLabel tone="blue">K Raheja Commercial</SectionLabel>
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="mt-3 font-display text-2xl leading-tight text-ink text-balance sm:text-3xl lg:mt-6 lg:text-4xl"
        >
          Creating India&rsquo;s Future Workplaces
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base lg:mt-6 lg:text-lg">
          K Raheja Commercial develops integrated business ecosystems designed around
          connectivity, sustainability, and human experience.
        </motion.p>

        <motion.ul variants={staggerChildren(0.05)} className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-3 lg:mt-8">
          {COMMERCIAL_FEATURES.map((feature) => (
            <motion.li key={feature} variants={fadeUp} className="flex items-start gap-2">
              <Check size={14} className="mt-0.5 shrink-0 text-blue" strokeWidth={2} />
              <span className="text-xs text-ink-muted sm:text-sm">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div variants={fadeUp} className="hidden lg:block">
        <MediaPlate tone="cool" className="aspect-[4/5] w-full rounded-lg" />
      </motion.div>
    </motion.div>
  );
}

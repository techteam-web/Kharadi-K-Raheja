import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { BUSINESS_VERTICALS } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function BusinessesSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel tone="blue">Our Businesses</SectionLabel>
      </motion.div>
      <motion.h2 className="mt-3 max-w-xl font-display text-xl leading-tight text-ink text-balance sm:text-2xl lg:mt-6 lg:text-4xl" variants={fadeUp}>
        A diversified group, one long-term view.
      </motion.h2>

      <motion.div
        variants={staggerChildren(0.08)}
        className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0"
      >
        {BUSINESS_VERTICALS.map((vertical) => (
          <motion.div
            key={vertical.id}
            variants={fadeUp}
            className="flex w-[78%] shrink-0 snap-start flex-col rounded-lg border border-hairline bg-surface p-4 sm:w-[45%] sm:p-6 lg:h-72 lg:w-auto"
          >
            <div className="font-display text-lg text-ink lg:text-xl">{vertical.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted lg:mt-3 lg:flex-1">{vertical.description}</p>
            <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 border-t border-hairline pt-3 lg:mt-4 lg:pt-4">
              {vertical.brands.map((brand) => (
                <span key={brand} className="label-caps text-ink-muted">
                  {brand}
                  {vertical.brands.indexOf(brand) < vertical.brands.length - 1 ? ' ·' : ''}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { COMPANY_STATS } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';
import overviewImage from '@/assets/images/about-corporate-overview.jpg';

export function OverviewSlide() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      animate="visible"
      className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <motion.div variants={fadeUp}>
          <SectionLabel tone="blue">K Raheja Corp</SectionLabel>
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="mt-3 font-display text-2xl leading-[1.08] text-ink text-balance sm:text-3xl lg:mt-6 lg:text-5xl"
        >
          Building Businesses. Building Legacies.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base lg:mt-7 lg:text-lg"
        >
          K Raheja Corp is one of India&rsquo;s leading real estate conglomerates, with a legacy
          spanning more than seven decades. Established in 1956, the Group has played a defining
          role in shaping modern India&rsquo;s urban landscape across commercial real estate,
          residential communities, hospitality, and retail.
        </motion.p>

        <motion.div
          variants={staggerChildren(0.08)}
          className="mt-5 grid grid-cols-2 gap-3 border-t border-hairline pt-4 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:pt-10"
        >
          {COMPANY_STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <div className="font-display text-2xl text-ink sm:text-3xl lg:text-4xl">{stat.value}</div>
              <div className="mt-1 label-caps text-ink-muted lg:mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="hidden lg:block">
        <img
          src={overviewImage}
          alt="K Raheja Corp — modern glass office building exterior"
          className="aspect-[4/5] w-full rounded-lg object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

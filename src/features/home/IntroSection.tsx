import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, staggerChildren } from '@/animations/motion';

const STATS = [
  { value: '2.1M', label: 'Sq. Ft. Development' },
  { value: '8.6 KM', label: 'From Pune Airport' },
  { value: 'Grade A', label: 'Commercial Address' },
];

export function IntroSection() {
  return (
    <section className="relative w-full border-t border-hairline bg-paper px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:py-28">
      <motion.div
        variants={staggerChildren(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 gap-x-10 gap-y-6 lg:grid-cols-12"
      >
        <div className="lg:col-span-4">
          <motion.div variants={fadeUp}>
            <SectionLabel tone="blue">The Address</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-6 text-3xl leading-[1.15] text-ink text-balance lg:text-4xl">
            A commercial landmark, composed for the long term.
          </motion.h2>
        </div>
        <div className="lg:col-span-1" />
        <motion.p variants={fadeUp} className="text-lg leading-relaxed text-ink-muted lg:col-span-6 lg:self-end">
          Kharadi 57 sits at the intersection of connectivity and craft — a Grade-A
          commercial address engineered with efficient floorplates, considered
          materiality, and a facade built to hold its own on Kharadi&rsquo;s skyline
          for decades to come.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerChildren(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-1 gap-6 border-t border-hairline pt-10 sm:grid-cols-3 sm:gap-10 lg:mt-20"
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <div className="font-display text-4xl text-ink lg:text-5xl">{stat.value}</div>
            <div className="mt-3 label-caps text-ink-muted">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

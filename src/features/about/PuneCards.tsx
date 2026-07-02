import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PUNE_PORTFOLIO } from '@/data/about';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function PuneCards() {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex snap-x gap-4 overflow-x-auto pb-2 sm:gap-5 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
    >
      {PUNE_PORTFOLIO.map((project) => (
        <motion.div
          key={project.id}
          variants={fadeUp}
          className="group flex h-40 w-[70%] shrink-0 snap-start flex-col justify-between rounded-lg border border-hairline bg-surface p-5 transition-colors duration-300 hover:border-blue sm:w-[42%] sm:p-6 lg:h-44 lg:w-auto"
        >
          <div className="flex items-start justify-between">
            <span className="label-caps text-ink-muted">{project.type}</span>
            <ArrowUpRight
              size={16}
              className="text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue"
            />
          </div>
          <div>
            <div className="font-display text-xl text-ink">{project.name}</div>
            <div
              className={
                project.status === 'Ongoing'
                  ? 'mt-2 label-caps text-blue'
                  : 'mt-2 label-caps text-green'
              }
            >
              {project.status}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

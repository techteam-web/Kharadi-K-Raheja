import { motion } from 'framer-motion';
import { fadeUp, staggerChildren } from '@/animations/motion';
import { SectionLabel } from './SectionLabel';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <motion.div
      variants={staggerChildren(0.12)}
      initial="hidden"
      animate="visible"
      className="max-w-3xl"
    >
      <motion.div variants={fadeUp}>
        <SectionLabel tone="blue">{eyebrow}</SectionLabel>
      </motion.div>
      <motion.h1
        variants={fadeUp}
        className="mt-4 text-2xl leading-[1.08] text-ink text-balance sm:mt-5 sm:text-3xl lg:text-[2.75rem]"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p variants={fadeUp} className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:mt-5 sm:text-base lg:text-[1.0625rem]">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { PageHeader } from '@/components/ui/PageHeader';
import { DetailCard } from '@/features/projectDetails/DetailCard';
import { DetailOverlay } from '@/features/projectDetails/DetailOverlay';
import { PROJECT_DETAIL_CATEGORIES } from '@/data/projectDetails';
import { staggerChildren, fadeUp } from '@/animations/motion';
import type { ProjectDetailCategoryId } from '@/types';

export default function ProjectDetailsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectDetailCategoryId>('exterior');
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const category = PROJECT_DETAIL_CATEGORIES.find((c) => c.id === activeCategory)!;
  const openItem = category.items.find((i) => i.id === openItemId);

  return (
    <div className="px-4 py-10 sm:px-8 sm:py-14 lg:py-20 lg:pl-20 lg:pr-28 xl:pr-32">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <PageHeader
          eyebrow="Project Details"
          title="Every detail, considered."
          description="From the arrival sequence to the finishing touches — explore the building across three lenses."
        />
        <div className="glass flex w-full items-center gap-1 overflow-x-auto rounded-full p-1.5 lg:w-auto">
          {PROJECT_DETAIL_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={clsx(
                'shrink-0 whitespace-nowrap rounded-full px-3 py-2 label-caps transition-colors duration-300 sm:px-5 sm:py-2.5',
                activeCategory === c.id ? 'bg-blue text-paper' : 'text-ink-muted hover:text-ink',
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={staggerChildren(0.08)}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:mt-16 lg:grid-cols-4"
        >
          {category.items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <DetailCard item={item} onOpen={() => setOpenItemId(item.id)} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {openItem && <DetailOverlay item={openItem} onClose={() => setOpenItemId(null)} />}
      </AnimatePresence>
    </div>
  );
}

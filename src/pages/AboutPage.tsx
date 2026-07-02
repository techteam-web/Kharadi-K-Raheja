import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { KRahejaCorpTab } from '@/features/about/tabs/KRahejaCorpTab';
import { CommercialSlide } from '@/features/about/slides/CommercialSlide';
import { IndiaPresenceTab } from '@/features/about/tabs/IndiaPresenceTab';
import { PunePortfolioSlide } from '@/features/about/slides/PunePortfolioSlide';
import { pageTransition } from '@/animations/motion';

const TABS = [
  { id: 'kraheja-corp', label: 'K Raheja Corp', Component: KRahejaCorpTab },
  { id: 'commercial', label: 'Commercial', Component: CommercialSlide },
  { id: 'india-presence', label: 'India Presence', Component: IndiaPresenceTab },
  { id: 'pune-portfolio', label: 'Pune Portfolio', Component: PunePortfolioSlide },
] as const;

type AboutTabId = (typeof TABS)[number]['id'];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTabId>('kraheja-corp');
  const ActiveComponent = TABS.find((t) => t.id === activeTab)!.Component;

  return (
    <div className="flex h-full flex-col px-4 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6 lg:px-20 lg:pt-14 lg:pb-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="label-caps text-ink-muted">About</span>
        <div className="flex items-center gap-1 overflow-x-auto rounded-lg border border-hairline p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'shrink-0 whitespace-nowrap rounded-md px-3 py-2 label-caps transition-colors duration-300 sm:px-5 sm:py-2.5',
                activeTab === tab.id ? 'bg-blue text-paper' : 'text-ink-muted hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-hidden sm:mt-6 lg:mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full"
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

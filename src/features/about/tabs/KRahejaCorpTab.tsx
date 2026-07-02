import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideStepper } from '@/features/about/SlideStepper';
import { OverviewSlide } from '@/features/about/slides/OverviewSlide';
import { BusinessesSlide } from '@/features/about/slides/BusinessesSlide';
import { VisionSlide } from '@/features/about/slides/VisionSlide';
import { pageTransition } from '@/animations/motion';

const SLIDES = [OverviewSlide, BusinessesSlide, VisionSlide];

export function KRahejaCorpTab() {
  const [active, setActive] = useState(0);
  const Slide = SLIDES[active];

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={active} variants={pageTransition} initial="initial" animate="animate" exit="exit" className="h-full">
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center pb-4">
        <SlideStepper count={SLIDES.length} active={active} onChange={setActive} />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlideStepper } from '@/features/about/SlideStepper';
import { IndiaMapSlide } from '@/features/about/slides/IndiaMapSlide';
import { TimelineSlide } from '@/features/about/slides/TimelineSlide';
import { pageTransition } from '@/animations/motion';

const SLIDES = [IndiaMapSlide, TimelineSlide];

export function IndiaPresenceTab() {
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

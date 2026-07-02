import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { MediaPlate } from '@/components/ui/MediaPlate';
import { Button } from '@/components/ui/Button';
import { BROCHURE_PAGES } from '@/data/misc';

export function BrochureViewer() {
  const [index, setIndex] = useState(0);
  const page = BROCHURE_PAGES[index];
  const isFirst = index === 0;
  const isLast = index === BROCHURE_PAGES.length - 1;

  const go = (dir: 1 | -1) => {
    setIndex((i) => Math.min(BROCHURE_PAGES.length - 1, Math.max(0, i + dir)));
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{ perspective: 1800 }} className="relative aspect-[380/520] w-[58vw] max-w-[300px] sm:w-[380px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={page.id}
            initial={{ rotateY: -100, opacity: 0.4 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 100, opacity: 0.4 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="absolute inset-0 overflow-hidden rounded-md border border-hairline shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]"
          >
            <MediaPlate tone={index === 0 ? 'dark' : 'neutral'} grain={index === 0} className="h-full w-full">
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-9">
                <span className={index === 0 ? 'label-caps text-paper/60' : 'label-caps text-ink-muted'}>
                  {String(index + 1).padStart(2, '0')} / {String(BROCHURE_PAGES.length).padStart(2, '0')}
                </span>
                <h2
                  className={
                    index === 0
                      ? 'mt-1.5 font-display text-lg text-paper sm:mt-3 sm:text-4xl'
                      : 'mt-1.5 font-display text-lg text-ink sm:mt-3 sm:text-3xl'
                  }
                >
                  {page.heading}
                </h2>
                <p className={`mt-1.5 text-xs sm:mt-3 sm:text-base ${index === 0 ? 'text-paper/80' : 'text-ink-muted'}`}>
                  {page.body}
                </p>
              </div>
            </MediaPlate>
          </motion.div>
        </AnimatePresence>

        {/* Spine shadow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 to-transparent" />
      </div>

      <div className="mt-4 flex items-center gap-4 sm:mt-10 sm:gap-6">
        <button
          onClick={() => go(-1)}
          disabled={isFirst}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:text-ink disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="label-caps text-ink-muted">{page.heading}</span>
        <button
          onClick={() => go(1)}
          disabled={isLast}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:text-ink disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-4 sm:mt-10">
        <Button variant="accent" icon={Download}>
          Download Brochure
        </Button>
      </div>
    </div>
  );
}

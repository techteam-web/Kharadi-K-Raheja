import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BROCHURE_PAGES } from '@/data/misc';
import { generateBrochurePdf } from './generateBrochurePdf';

export function BrochureViewer() {
  const [index, setIndex] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const page = BROCHURE_PAGES[index];
  const isFirst = index === 0;
  const isLast = index === BROCHURE_PAGES.length - 1;

  const go = (dir: 1 | -1) => {
    setIndex((i) => Math.min(BROCHURE_PAGES.length - 1, Math.max(0, i + dir)));
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const doc = await generateBrochurePdf(BROCHURE_PAGES);
      doc.save('Kharadi-57-Brochure.pdf');
    } finally {
      setIsDownloading(false);
    }
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
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]"
          >
            <div className="relative h-full w-full">
              <img src={page.image} alt={page.heading} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-9">
                <span className="label-caps text-paper/60">
                  {String(index + 1).padStart(2, '0')} / {String(BROCHURE_PAGES.length).padStart(2, '0')}
                </span>
                <h2 className="mt-1.5 font-display text-lg text-paper sm:mt-3 sm:text-4xl">{page.heading}</h2>
                <p className="mt-1.5 text-xs text-paper/80 sm:mt-3 sm:text-base">{page.body}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Spine shadow */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/15 to-transparent" />
      </div>

      <div className="mt-4 flex items-center gap-4 sm:mt-10 sm:gap-6">
        <button
          onClick={() => go(-1)}
          disabled={isFirst}
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-ink disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="label-caps text-ink-muted">{page.heading}</span>
        <button
          onClick={() => go(1)}
          disabled={isLast}
          className="glass flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:text-ink disabled:opacity-30 sm:h-10 sm:w-10"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-4 sm:mt-10">
        <Button
          variant="accent"
          icon={isDownloading ? Loader2 : Download}
          iconClassName={isDownloading ? 'animate-spin' : undefined}
          onClick={handleDownload}
          disabled={isDownloading}
          className={isDownloading ? 'opacity-70' : undefined}
        >
          {isDownloading ? 'Preparing…' : 'Download Brochure'}
        </Button>
      </div>
    </div>
  );
}

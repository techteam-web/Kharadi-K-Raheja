import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAN_INDIA_CITIES } from '@/data/about';

/** Stylized, non-literal silhouette suggestive of the Indian peninsula. */
const SILHOUETTE_CLIP =
  'polygon(31% 0%, 46% 4%, 57% 9%, 71% 15%, 80% 24%, 76% 34%, 66% 41%, 63% 53%, 56% 64%, 49% 77%, 41% 96%, 34% 84%, 27% 74%, 21% 66%, 13% 53%, 9% 39%, 12% 24%, 19% 11%)';

export function IndiaMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative aspect-[3/4] w-full max-w-[180px] mx-auto sm:max-w-[260px] lg:max-w-md">
      <div
        className="glass-soft absolute inset-0 transition-colors duration-500"
        style={{ clipPath: SILHOUETTE_CLIP }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          clipPath: SILHOUETTE_CLIP,
          backgroundImage:
            'linear-gradient(transparent 95%, #e8e8e8 95%), linear-gradient(90deg, transparent 95%, #e8e8e8 95%)',
          backgroundSize: '12% 12%',
        }}
      />

      {PAN_INDIA_CITIES.map((city) => {
        const isActive = activeId === city.id;
        return (
          <button
            key={city.id}
            onMouseEnter={() => setActiveId(city.id)}
            onMouseLeave={() => setActiveId(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
          >
            <span className="relative flex items-center justify-center">
              <motion.span
                animate={{ scale: isActive ? 2.4 : 1, opacity: isActive ? 0 : 0.35 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute h-3 w-3 rounded-full bg-blue"
              />
              <motion.span
                animate={{ scale: isActive ? 1.3 : 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-2 w-2 rounded-full bg-blue"
              />
            </span>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className="glass-strong absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-2"
                >
                  <div className="text-sm font-medium text-ink">{city.name}</div>
                  <div className="label-caps text-ink-muted mt-0.5">{city.projects} Projects</div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

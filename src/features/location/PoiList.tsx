import { motion, AnimatePresence } from 'framer-motion';
import { LOCATION_CATEGORIES } from '@/data/location';
import { useLocationStore } from '@/stores/useLocationStore';
import { ACCENT_HEX } from './accent';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function PoiList() {
  const activeCategory = useLocationStore((s) => s.activeCategory);
  const activePoiId = useLocationStore((s) => s.activePoiId);
  const setActivePoi = useLocationStore((s) => s.setActivePoi);

  const category = LOCATION_CATEGORIES.find((c) => c.id === activeCategory)!;
  const color = ACCENT_HEX[category.accent];

  return (
    <div className="glass-strong flex w-full flex-col rounded-3xl lg:w-[340px]">
      <div className="border-b border-white/25 px-4 py-3 sm:px-6 sm:py-5">
        <div className="label-caps" style={{ color }}>
          {category.label}
        </div>
        <p className="mt-1.5 hidden text-sm leading-relaxed text-ink-muted sm:block sm:mt-2">{category.description}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={staggerChildren(0.05)}
          initial="hidden"
          animate="visible"
          className="flex max-h-[30svh] flex-col divide-y divide-hairline overflow-y-auto sm:max-h-[340px]"
        >
          {category.points.map((point) => {
            const isActive = activePoiId === point.id;
            return (
              <motion.button
                key={point.id}
                variants={fadeUp}
                onClick={() => setActivePoi(isActive ? null : point.id)}
                className="flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-200 sm:px-6 sm:py-3.5"
                style={{ backgroundColor: isActive ? `${color}0d` : 'transparent' }}
              >
                <span className={isActive ? 'text-sm font-medium text-ink' : 'text-sm text-ink'}>
                  {point.name}
                </span>
                <span className="label-caps shrink-0 pl-4 text-ink-muted">{point.distance}</span>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

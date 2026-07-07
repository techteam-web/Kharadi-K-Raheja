import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, MapPin } from 'lucide-react';
import type { PlanView } from '@/types';

interface PlanViewerProps {
  plan: PlanView;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.4;

export function PlanViewer({ plan }: PlanViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dragRange = (zoom - 1) * 340;

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-surface">
      <motion.div
        drag={zoom > 1}
        dragConstraints={{ left: -dragRange, right: dragRange, top: -dragRange, bottom: dragRange }}
        dragElastic={0.06}
        animate={{ scale: zoom }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full cursor-grab active:cursor-grabbing"
      >
        <div className="relative h-full w-full">
          <img src={plan.image} alt={plan.label} className="h-full w-full object-contain" draggable={false} />
        </div>

        {plan.hotspots.map((hotspot) => {
          const isActive = activeHotspot === hotspot.id;
          return (
            <button
              key={hotspot.id}
              onMouseEnter={() => setActiveHotspot(hotspot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              <span className="relative flex h-8 w-8 items-center justify-center">
                <motion.span
                  animate={{ scale: isActive ? 1.8 : 1, opacity: isActive ? 0 : 0.4 }}
                  transition={{ duration: 0.6 }}
                  className="absolute h-full w-full rounded-full bg-blue"
                />
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue text-paper">
                  <MapPin size={9} strokeWidth={2.5} />
                </span>
              </span>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="glass-strong absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-xl px-3 py-1.5"
                  >
                    <span className="text-sm font-medium text-ink">{hotspot.label}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </motion.div>

      <div className="glass-strong absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-2xl sm:bottom-8 sm:right-8">
        <button
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.4))}
          className="flex h-10 w-10 items-center justify-center text-ink-muted transition-colors hover:text-ink border-b border-white/25"
        >
          <Plus size={15} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.4))}
          className="flex h-10 w-10 items-center justify-center text-ink-muted transition-colors hover:text-ink"
        >
          <Minus size={15} />
        </button>
      </div>
    </div>
  );
}

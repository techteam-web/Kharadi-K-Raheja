import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { MediaPlate } from '@/components/ui/MediaPlate';

export function CompareSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full select-none overflow-hidden rounded-lg"
      onPointerMove={(e) => {
        if (e.buttons === 1) updateFromClientX(e.clientX);
      }}
      onPointerDown={(e) => updateFromClientX(e.clientX)}
    >
      {/* Vacant (base layer) */}
      <MediaPlate tone="neutral" grain={false} className="absolute inset-0 h-full w-full" label="Vacant Space" />

      {/* Furnished (clipped overlay) — clip-path animates every drag frame, so no blend-mode grain here */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, willChange: 'clip-path' }}
      >
        <MediaPlate tone="warm" grain={false} className="h-full w-full" label="Furnished Space" />
      </div>

      {/* Divider handle */}
      <motion.div
        className="pointer-events-none absolute top-0 h-full"
        style={{ left: `${position}%` }}
      >
        <div className="h-full w-px bg-paper" />
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          <GripVertical size={16} className="text-ink" />
        </div>
      </motion.div>

      {/* Labels */}
      <div className="pointer-events-none absolute left-6 top-6 label-caps text-paper/80">Furnished</div>
      <div className="pointer-events-none absolute right-6 top-6 label-caps text-ink/60">Vacant</div>
    </div>
  );
}

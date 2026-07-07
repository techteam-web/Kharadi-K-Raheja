import { motion, useReducedMotion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FloorSelector } from './FloorSelector';
import { FloorPlateDiagram } from './FloorPlateDiagram';
import { UnitDetailPanel } from './UnitDetailPanel';
import { useFloorPlanStore } from '@/stores/useFloorPlanStore';
import { TOWERS, FLOOR_HEIGHT_M, floorLabelFor } from '@/data/units';
import { fadeUp, staggerChildren } from '@/animations/motion';

export function FloorPlanScreen() {
  const selectedTower = useFloorPlanStore((s) => s.selectedTower);
  const selectedFloor = useFloorPlanStore((s) => s.selectedFloor);
  const prefersReducedMotion = useReducedMotion();

  const towerLabel = TOWERS.find((t) => t.id === selectedTower)?.label ?? selectedTower;
  const floorTitle = selectedFloor === 0 ? 'Ground plate' : `Floor ${floorLabelFor(selectedFloor)} plate`;

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : staggerChildren(0.1)}
      initial={prefersReducedMotion ? undefined : 'hidden'}
      animate={prefersReducedMotion ? undefined : 'visible'}
      className="flex h-full flex-col"
    >
      <motion.div
        variants={prefersReducedMotion ? undefined : fadeUp}
        className="flex flex-col gap-3 border-b border-hairline pb-5 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <SectionLabel index="05" tone="green">
            Floor Plate
          </SectionLabel>
          <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">{floorTitle}</h2>
        </div>
        <div className="label-caps text-ink-muted">
          {towerLabel} · {FLOOR_HEIGHT_M}m floor height
        </div>
      </motion.div>

      <motion.div variants={prefersReducedMotion ? undefined : fadeUp} className="mt-5">
        <FloorSelector />
      </motion.div>

      <motion.div
        variants={prefersReducedMotion ? undefined : fadeUp}
        className="mt-5 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:grid-cols-12"
      >
        <div className="min-h-[360px] lg:col-span-8">
          <FloorPlateDiagram />
        </div>
        <div className="min-h-[420px] lg:col-span-4">
          <UnitDetailPanel />
        </div>
      </motion.div>
    </motion.div>
  );
}

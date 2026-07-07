import { useMemo } from 'react';
import type { CSSProperties } from 'react';
import { Navigation2 } from 'lucide-react';
import clsx from 'clsx';
import { getPlottedUnits } from '@/data/units';
import { useFloorPlanStore } from '@/stores/useFloorPlanStore';
import { UNIT_STATUS_META, UNIT_STATUS_ORDER } from './statusMeta';
import { formatArea } from '@/utils/format';

interface QuadrantLayout {
  x: number;
  y: number;
  w: number;
  h: number;
  labelAnchor: { x: number; y: number; anchor?: 'start' | 'end' };
  subAnchor: { x: number; y: number; anchor?: 'start' | 'end' };
  swatch: { x: number; y: number };
}

const QUADRANTS: QuadrantLayout[] = [
  // top-left
  { x: 20, y: 20, w: 130, h: 130, labelAnchor: { x: 32, y: 46 }, subAnchor: { x: 32, y: 62 }, swatch: { x: 32, y: 128 } },
  // top-right
  { x: 250, y: 20, w: 130, h: 130, labelAnchor: { x: 368, y: 46, anchor: 'end' }, subAnchor: { x: 368, y: 62, anchor: 'end' }, swatch: { x: 362, y: 128 } },
  // bottom-left
  { x: 20, y: 250, w: 130, h: 130, labelAnchor: { x: 32, y: 344 }, subAnchor: { x: 32, y: 360 }, swatch: { x: 32, y: 252 } },
  // bottom-right
  { x: 250, y: 250, w: 130, h: 130, labelAnchor: { x: 368, y: 344, anchor: 'end' }, subAnchor: { x: 368, y: 360, anchor: 'end' }, swatch: { x: 362, y: 252 } },
];

export function FloorPlateDiagram() {
  const selectedTower = useFloorPlanStore((s) => s.selectedTower);
  const selectedFloor = useFloorPlanStore((s) => s.selectedFloor);
  const selectedUnitId = useFloorPlanStore((s) => s.selectedUnitId);
  const selectUnit = useFloorPlanStore((s) => s.selectUnit);

  const units = useMemo(
    () => getPlottedUnits(selectedTower, selectedFloor),
    [selectedTower, selectedFloor],
  );

  return (
    <div className="glass relative flex h-full w-full flex-col overflow-hidden rounded-3xl">
      <div className="pointer-events-none absolute right-5 top-5 z-10 flex flex-col items-center gap-1 text-ink-muted">
        <Navigation2 size={16} strokeWidth={1.8} />
        <span className="label-caps">N</span>
      </div>

      <div className="min-h-0 flex-1 p-4 sm:p-8">
        <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Floor plate diagram">
          {/* Slab outline */}
          <rect x={20} y={20} width={360} height={360} rx={4} fill="none" stroke="var(--color-hairline)" strokeWidth={1.5} />

          {/* Core / lift lobby */}
          <rect x={150} y={150} width={100} height={100} fill="var(--color-surface)" stroke="var(--color-hairline)" strokeWidth={1.5} />
          <line x1={200} y1={150} x2={200} y2={250} stroke="var(--color-hairline)" strokeWidth={1} />
          <line x1={150} y1={200} x2={250} y2={200} stroke="var(--color-hairline)" strokeWidth={1} />
          <text x={200} y={192} textAnchor="middle" className="fill-ink-muted" style={{ font: '600 6.5px var(--font-body)', letterSpacing: '0.08em' }}>
            LIFT LOBBY
          </text>
          <text x={200} y={212} textAnchor="middle" className="fill-ink-muted" style={{ font: '600 6.5px var(--font-body)', letterSpacing: '0.08em' }}>
            CORE
          </text>

          {units.map((unit, i) => {
            const q = QUADRANTS[i];
            const isSelected = unit.id === selectedUnitId;
            const color = UNIT_STATUS_META[unit.status].color;
            const style = {
              '--fill-hover': `${color}1a`,
            } as CSSProperties;

            return (
              <g key={unit.id} onClick={() => selectUnit(unit.id)} className="cursor-pointer" style={style}>
                <rect
                  x={q.x}
                  y={q.y}
                  width={q.w}
                  height={q.h}
                  fill={isSelected ? `${color}29` : 'transparent'}
                  stroke={isSelected ? color : 'var(--color-hairline)'}
                  strokeWidth={isSelected ? 2 : 1}
                  className={clsx(
                    'transition-all duration-300',
                    !isSelected && 'hover:[fill:var(--fill-hover)] hover:[stroke:var(--color-ink-muted)]',
                  )}
                />
                <text
                  x={q.labelAnchor.x}
                  y={q.labelAnchor.y}
                  textAnchor={q.labelAnchor.anchor ?? 'start'}
                  className="pointer-events-none fill-ink"
                  style={{ font: '600 11px var(--font-body)' }}
                >
                  {unit.unitNo}
                </text>
                <text
                  x={q.subAnchor.x}
                  y={q.subAnchor.y}
                  textAnchor={q.subAnchor.anchor ?? 'start'}
                  className="pointer-events-none fill-ink-muted"
                  style={{ font: '500 8px var(--font-body)' }}
                >
                  {formatArea(unit.carpet)} sqft
                </text>
                <rect x={q.swatch.x} y={q.swatch.y} width={6} height={6} fill={color} className="pointer-events-none" />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-4">
          {UNIT_STATUS_ORDER.map((status) => {
            const meta = UNIT_STATUS_META[status];
            return (
              <div key={status} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: meta.color }} />
                <span className="label-caps text-ink-muted">{meta.label}</span>
              </div>
            );
          })}
        </div>
        <span className="label-caps hidden text-ink-muted sm:inline">Hover to preview · Select to open</span>
      </div>
    </div>
  );
}

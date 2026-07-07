import type { Unit, UnitFacing, UnitViewType } from '@/types';

export const TOWERS = [
  { id: 'T1', label: 'Tower 1' },
  { id: 'T2', label: 'Tower 2' },
] as const;

export type TowerId = (typeof TOWERS)[number]['id'];

/** Ground + 11 typical office floors per tower. */
export const FLOOR_KEYS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function floorLabelFor(floor: number): string {
  return floor === 0 ? 'G' : String(floor).padStart(2, '0');
}

const FACINGS: UnitFacing[] = ['North-East', 'North', 'East', 'South-East', 'West', 'North-West'];
const VIEWS: UnitViewType[] = ['Cityscape view', 'Garden view', 'Avenue view', 'Terrace view', 'Skyline view'];
const STATUS_POOL: Unit['status'][] = ['available', 'available', 'available', 'on-hold', 'sold'];

const RATE_PER_SQFT = 9800;
export const FLOOR_HEIGHT_M = 4.2;
const UNITS_PER_FLOOR = 12;
/** First 4 units of a floor are plotted on the diagram; the rest exist for count/data completeness only. */
export const PLOTTED_UNITS_PER_FLOOR = 4;

/** Small deterministic hash so unit attributes vary per tower/floor/index without randomness drifting between renders. */
function seededIndex(...parts: (string | number)[]): number {
  const str = parts.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (Math.imul(hash, 31) + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildFloorUnits(tower: string, floor: number): Unit[] {
  const floorLabel = floorLabelFor(floor);

  return Array.from({ length: UNITS_PER_FLOOR }, (_, idx) => {
    const facing = FACINGS[seededIndex(tower, floor, idx, 'facing') % FACINGS.length];
    const view = VIEWS[seededIndex(tower, floor, idx, 'view') % VIEWS.length];
    const status = STATUS_POOL[seededIndex(tower, floor, idx, 'status') % STATUS_POOL.length];

    const carpet = 950 + idx * 165 + (floor % 4) * 35;
    const saleable = Math.round(carpet * 1.35);
    const price = saleable * RATE_PER_SQFT;

    const unitNo = `${floor === 0 ? '0' : floor}${String(idx + 1).padStart(2, '0')}`;
    const id = `${tower}-${unitNo}`;

    return {
      id,
      unitNo,
      tower,
      floor,
      floorLabel,
      carpet,
      saleable,
      facing,
      view,
      status,
      ratePerSqft: RATE_PER_SQFT,
      price,
      highlights: [
        `${facing} facing`,
        view,
        `${FLOOR_HEIGHT_M}m floor-to-floor height`,
      ],
    };
  });
}

const FLOOR_UNITS = new Map<string, Unit[]>();
const UNIT_BY_ID = new Map<string, Unit>();

for (const tower of TOWERS) {
  for (const floor of FLOOR_KEYS) {
    const units = buildFloorUnits(tower.id, floor);
    FLOOR_UNITS.set(`${tower.id}-${floor}`, units);
    units.forEach((unit) => UNIT_BY_ID.set(unit.id, unit));
  }
}

/** All 12 units (4 plotted + 8 filler) for a tower/floor. */
export function getUnitsForFloor(tower: string, floor: number): Unit[] {
  return FLOOR_UNITS.get(`${tower}-${floor}`) ?? [];
}

/** Just the 4 units shown on the floor plate diagram. */
export function getPlottedUnits(tower: string, floor: number): Unit[] {
  return getUnitsForFloor(tower, floor).slice(0, PLOTTED_UNITS_PER_FLOOR);
}

export function getUnitById(id: string): Unit | undefined {
  return UNIT_BY_ID.get(id);
}

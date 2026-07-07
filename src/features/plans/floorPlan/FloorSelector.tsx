import clsx from 'clsx';
import { TOWERS, FLOOR_KEYS, floorLabelFor } from '@/data/units';
import { useFloorPlanStore } from '@/stores/useFloorPlanStore';

export function FloorSelector() {
  const selectedTower = useFloorPlanStore((s) => s.selectedTower);
  const selectedFloor = useFloorPlanStore((s) => s.selectedFloor);
  const selectTower = useFloorPlanStore((s) => s.selectTower);
  const selectFloor = useFloorPlanStore((s) => s.selectFloor);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="glass flex shrink-0 items-center gap-1 rounded-full p-1.5">
        {TOWERS.map((tower) => (
          <button
            key={tower.id}
            onClick={() => selectTower(tower.id)}
            className={clsx(
              'rounded-full px-4 py-2 label-caps transition-colors duration-300',
              selectedTower === tower.id ? 'bg-blue text-paper' : 'text-ink-muted hover:text-ink',
            )}
          >
            {tower.label}
          </button>
        ))}
      </div>

      <div className="glass flex w-full items-center gap-1 overflow-x-auto rounded-full p-1.5 sm:w-auto">
        {FLOOR_KEYS.map((floor) => (
          <button
            key={floor}
            onClick={() => selectFloor(floor)}
            className={clsx(
              'shrink-0 rounded-full px-3.5 py-2 label-caps transition-colors duration-300',
              selectedFloor === floor ? 'bg-green text-paper' : 'text-ink-muted hover:text-ink',
            )}
          >
            {floorLabelFor(floor)}
          </button>
        ))}
      </div>
    </div>
  );
}

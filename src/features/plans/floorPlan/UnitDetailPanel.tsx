import { useNavigate } from 'react-router-dom';
import { Check, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useFloorPlanStore } from '@/stores/useFloorPlanStore';
import { getUnitById } from '@/data/units';
import { UNIT_STATUS_META } from './statusMeta';
import { formatArea, formatPriceInCrores } from '@/utils/format';

const FLOOR_HEIGHT_LABEL = '4.2 m';
const POSSESSION_LABEL = 'Dec 2027';

export function UnitDetailPanel() {
  const navigate = useNavigate();
  const selectedUnitId = useFloorPlanStore((s) => s.selectedUnitId);
  const compareList = useFloorPlanStore((s) => s.compareList);
  const shortlist = useFloorPlanStore((s) => s.shortlist);
  const toggleCompare = useFloorPlanStore((s) => s.toggleCompare);
  const toggleShortlist = useFloorPlanStore((s) => s.toggleShortlist);

  const unit = selectedUnitId ? getUnitById(selectedUnitId) : undefined;

  if (!unit) {
    return (
      <div className="glass-strong flex h-full w-full flex-col items-center justify-center rounded-3xl p-8 text-center">
        <LayoutGrid size={22} strokeWidth={1.5} className="mb-3 text-ink-muted" />
        <p className="text-sm font-medium text-ink">No unit selected</p>
        <p className="mt-1.5 max-w-[220px] text-xs leading-relaxed text-ink-muted">
          Click any unit on the floor plate to view its details here.
        </p>
      </div>
    );
  }

  const statusMeta = UNIT_STATUS_META[unit.status];
  const isComparing = compareList.includes(unit.id);
  const compareFull = compareList.length >= 3 && !isComparing;
  const isShortlisted = shortlist.includes(unit.id);

  const specRows: [string, string][] = [
    ['Carpet', `${formatArea(unit.carpet)} sqft`],
    ['Saleable', `${formatArea(unit.saleable)} sqft`],
    ['Facing', unit.facing],
    ['View', unit.view],
    ['Floor height', FLOOR_HEIGHT_LABEL],
    ['Possession', POSSESSION_LABEL],
    ['Rate', `₹${formatArea(unit.ratePerSqft)} / sqft`],
  ];

  return (
    <div className="glass-strong flex h-full w-full flex-col rounded-3xl">
      <div className="border-b border-hairline px-5 pb-4 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="label-caps text-ink-muted">Unit</div>
            <div className="mt-1 font-display text-3xl text-ink sm:text-4xl">{unit.unitNo}</div>
          </div>
          <span
            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: statusMeta.color }}
            title={statusMeta.label}
          />
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          {unit.tower} · {unit.floor === 0 ? 'Ground' : `Floor ${unit.floorLabel}`} · {unit.facing}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
        <div className="flex flex-col divide-y divide-hairline">
          {specRows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <span className="label-caps text-ink-muted">{label}</span>
              <span className="text-sm font-medium text-ink">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-2xl bg-blue-tint px-4 py-3.5">
          <span className="label-caps text-blue">Total</span>
          <span className="font-display text-2xl text-blue">{formatPriceInCrores(unit.price)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 border-t border-hairline p-5 sm:p-6">
        <Button variant="primary" className="w-full justify-center" onClick={() => navigate('/360-views')}>
          View 360
        </Button>

        <Button
          variant={isComparing ? 'accent' : 'secondary'}
          hideDefaultIcon
          disabled={compareFull}
          onClick={() => toggleCompare(unit.id)}
          className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isComparing ? 'In Comparison' : compareFull ? 'Comparison Full' : 'Add to Comparison'}
        </Button>

        <Button
          variant={isShortlisted ? 'accent' : 'secondary'}
          icon={isShortlisted ? Check : undefined}
          onClick={() => toggleShortlist(unit.id)}
          className="w-full justify-center"
        >
          {isShortlisted ? 'Shortlisted' : 'Shortlist'}
        </Button>
      </div>
    </div>
  );
}

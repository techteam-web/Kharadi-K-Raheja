import { create } from 'zustand';
import { TOWERS } from '@/data/units';

interface FloorPlanState {
  selectedTower: string;
  selectedFloor: number;
  selectedUnitId: string | null;
  /** Max 3 units, deduped by id. */
  compareList: string[];
  /** Unbounded, deduped by id. */
  shortlist: string[];
  selectTower: (tower: string) => void;
  selectFloor: (floor: number) => void;
  selectUnit: (unitId: string | null) => void;
  toggleCompare: (unitId: string) => void;
  toggleShortlist: (unitId: string) => void;
}

const MAX_COMPARE = 3;

export const useFloorPlanStore = create<FloorPlanState>((set) => ({
  selectedTower: TOWERS[0].id,
  selectedFloor: 8,
  selectedUnitId: null,
  compareList: [],
  shortlist: [],

  selectTower: (tower) => set({ selectedTower: tower, selectedUnitId: null }),
  selectFloor: (floor) => set({ selectedFloor: floor, selectedUnitId: null }),
  selectUnit: (unitId) => set({ selectedUnitId: unitId }),

  toggleCompare: (unitId) =>
    set((s) => {
      if (s.compareList.includes(unitId)) {
        return { compareList: s.compareList.filter((id) => id !== unitId) };
      }
      if (s.compareList.length >= MAX_COMPARE) return s;
      return { compareList: [...s.compareList, unitId] };
    }),

  toggleShortlist: (unitId) =>
    set((s) => ({
      shortlist: s.shortlist.includes(unitId)
        ? s.shortlist.filter((id) => id !== unitId)
        : [...s.shortlist, unitId],
    })),
}));

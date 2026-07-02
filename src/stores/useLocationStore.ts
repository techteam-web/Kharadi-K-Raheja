import { create } from 'zustand';
import type { LocationCategoryId } from '@/types';

interface LocationState {
  activeCategory: LocationCategoryId;
  activePoiId: string | null;
  setCategory: (category: LocationCategoryId) => void;
  setActivePoi: (id: string | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  activeCategory: 'connectivity',
  activePoiId: null,
  setCategory: (category) => set({ activeCategory: category, activePoiId: null }),
  setActivePoi: (id) => set({ activePoiId: id }),
}));

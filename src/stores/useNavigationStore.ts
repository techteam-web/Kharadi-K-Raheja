import { create } from 'zustand';

interface NavigationState {
  /** Nav bar dims/fades when an immersive surface (panorama, camera fly-through) takes over */
  isImmersive: boolean;
  setImmersive: (value: boolean) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  isImmersive: false,
  setImmersive: (value) => set({ isImmersive: value }),
}));

// src/store.ts
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  isToggled: boolean;
  toggle: () => void;
}

const useSidebarStore = create(
  persist<StoreState>(
    (set) => ({
      isToggled: false,
      toggle: () => set((state) => ({ isToggled: !state.isToggled })),
    }),
    {
      name: 'toggle-storage', 
    }
  )
);

export default useSidebarStore;

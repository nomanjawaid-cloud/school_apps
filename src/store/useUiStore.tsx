import { create } from "zustand";

interface UiStore {
  sidebarOpen: boolean;
  selectedItem: any | null;
  isExpanded: boolean;
  setExpanded: (v: boolean) => void;
  openSidebar: (item: any) => void;
  closeSidebar: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: false,
  selectedItem: null,
  isExpanded: false,
  setExpanded: (v) => set({ isExpanded: v }),
  openSidebar: (item) => set({ sidebarOpen: true, selectedItem: item }),
  closeSidebar: () => set({ sidebarOpen: false, selectedItem: null }),
}));

export interface Drawer {
  id: number;
  close: () => void;
  keyboard: boolean;
}

export interface DrawerManager {
  addDrawer: (drawer: Drawer) => void;
  removeDrawer: (drawerId: number) => void;
  closeLastDrawer: () => boolean;
  getNextId: () => number;
  hasDrawers: () => boolean;
}

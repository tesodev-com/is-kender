import { ref } from 'vue';
import type { Drawer, DrawerManager } from './types';

const drawerStack = ref<Drawer[]>([]);
let nextDrawerId = 1;

export const drawerManager: DrawerManager = {
  addDrawer(drawer: Drawer) {
    drawerStack.value.push(drawer);
  },

  removeDrawer(drawerId: number) {
    const index = drawerStack.value.findIndex(d => d.id === drawerId);
    if (index > -1) {
      drawerStack.value.splice(index, 1);
    }
  },

  closeLastDrawer() {
    if (drawerStack.value.length > 0) {
      const lastDrawer = drawerStack.value[drawerStack.value.length - 1];
      lastDrawer.close();
      return true;
    }
    return false;
  },

  getNextId() {
    return nextDrawerId++;
  },

  hasDrawers() {
    return drawerStack.value.length > 0;
  },
};

let escListenerAdded = false;

export function setupGlobalEscListener() {
  if (!escListenerAdded) {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        const closed = drawerManager.closeLastDrawer();
        if (closed) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    });
    escListenerAdded = true;
  }
}

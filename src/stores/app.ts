import { defineStore } from 'pinia';

interface UserState {
  isSidebarOpen: boolean;
}

export const useAppStore = defineStore('app', {
  state: (): UserState => {
    return {
      isSidebarOpen: true
    };
  },
  getters: {
    getIsSidebarOpen: (state: UserState): boolean => state.isSidebarOpen
  },
  actions: {
    setIsSidebarOpen (param: boolean) {
      this.isSidebarOpen = param;
    }
  }
});

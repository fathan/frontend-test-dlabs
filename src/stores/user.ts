/* eslint-disable max-len */
import { defineStore } from 'pinia';
import type { IUser } from '@/interfaces/user';

interface UserState {
  isVisibleFormModal: boolean;
  isLoadingFormSubmit: boolean;
  users: Array<IUser>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      isVisibleFormModal: false,
      isLoadingFormSubmit: false,
      users: []
    };
  },
  getters: {
    getIsVisibleFormModal: (state: UserState): boolean => state.isVisibleFormModal,
    getIsLoadingFormSubmit: (state: UserState): boolean => state.isLoadingFormSubmit,
    getUserAll: (state: UserState): Array<IUser> => state.users,
    getUserById: (state: UserState) => (id: number) => state.users.find((item) => item.id === id),
    getUserByStatus: (state: UserState) => (status: boolean) => state.users.filter((item) => item.status === status)
  },
  actions: {
    setIsVisibleFormModal (param: boolean) {
      this.isVisibleFormModal = param;
    },
    setIsLoadingFormSubmit (param: boolean) {
      this.isLoadingFormSubmit = param;
    },
    setUsers (param: Array<IUser>) {
      this.users = param;
    },
    createUser (param: IUser) {
      this.users.push(param);
    },
    updateUser (param: IUser) {
      this.users = this.users.map((item) => {
        if (item.id === param.id) {
          return param;
        }
        return item;
      });
    },
    deleteUser (id: number) {
      this.users = this.users.filter((item) => item.id !== id);
    },
    sortUsers (key: string, order: 'asc' | 'desc') {
      this.users = this.users.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];
    
        if (aValue === undefined) {
          return order === 'asc' ? 1 : -1;
        }
        if (bValue === undefined) {
          return order === 'asc' ? -1 : 1;
        }
    
        if (aValue < bValue) {
          return order === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  },
  persist: {
    storage: window.localStorage
  }
});

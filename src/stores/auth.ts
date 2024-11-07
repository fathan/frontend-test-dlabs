import { defineStore } from 'pinia';

interface UserLogin {
  username?: string;
  email?: string;
}

interface AuthState {
  accessToken: string;
  isAuthenticated: boolean;
  userLogin: UserLogin;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    return {
      accessToken: '',
      isAuthenticated: false,
      userLogin: {}
    };
  },
  getters: {
    getAccessToken: (state: AuthState): string => state.accessToken,
    getIsAuthenticated: (state: AuthState): boolean => state.isAuthenticated,
    getUserLogin: (state: AuthState): UserLogin => state.userLogin
  },
  actions: {
    setAccessToken (param: string) {
      this.accessToken = param;
    },
    setIsAuthenticated (param: boolean) {
      this.isAuthenticated = param;
    },
    setUserLogin (param: UserLogin) {
      this.userLogin = param;
    }
  },
  persist: {
    storage: window.localStorage
  }
});

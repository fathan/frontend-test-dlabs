import AxiosClient from './_axios';
import { useAuthStore } from '@stores/auth';
import router from '@/router';

let axiosRefreshRunning = false;

const sleep = (ms: number): Promise<void> => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const waitForRefresh = (): Promise<void> => {
  return new Promise((resolve) => {
    const check = () => {
      if (!axiosRefreshRunning) {
        resolve();
      }
      else {
        sleep(1000).then(check);
      }
    };
    check();
  });
};

const transform = {
  requestInterceptors: async (configuration: any) => {
    if (axiosRefreshRunning && configuration.url !== '/auth/refresh') {
      await waitForRefresh();
    }
    
    // const authStore = useAuthStore();
    // const token = authStore.getAccessToken;

    // if (token) {
    //   configuration.headers.Authorization = 'Bearer ' + token;
    // }

    return configuration;
  },

  requestInterceptorsError: (error: any) => {
    return Promise.reject(error);
  },

  responseInterceptors: (response: any) => {
    return response;
  },

  responseInterceptorsError: async (error: any) => {
    const { response, message } = error || {};

    const authStore = useAuthStore();
    const token = authStore.getAccessToken;

    try {
      if (message?.includes('Network Error')) {
        (self as any).$toasts.show({
          title: 'Check your internet connection!',
          type: 'error',
          isCancelable: true,
          autoclose: true
        });
      }

      if (response?.status === 403) {
        router.push({
          path: '/'
        });
      }

      if (response?.status !== 401) {
        return Promise.reject(error);
      }

      if (error.config.url === '/auth/refresh') {
        return Promise.reject(error);
      }

      if (token) {
        if (axiosRefreshRunning) {
          await waitForRefresh();

          return axiosClient.requestToServer(error.response.config);
        }

        axiosRefreshRunning = true;

        return axiosClient.requestToServer({
          url: '/auth/refresh',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {}
        }, true)
          .then((response: any) => {
            const authStore = useAuthStore();
            authStore.setAccessToken(response.headers.authorization);
            axiosRefreshRunning = false;

            return axiosClient.requestToServer(error.response.config, true);
          })
          .catch((error: any) => {
            if (token) {
              authStore.$reset();
              router.push({
                path: '/auth/login'
              });
              window.location.reload();
            }

            axiosRefreshRunning = false;

            return Promise.reject(error);
          });
      }
    }
    catch (error: any) {
      throw new Error(error);
    }

    return Promise.reject(error);
  }
};

let axiosClient: AxiosClient;

const initializeHttp = (): AxiosClient => {
  axiosClient = new AxiosClient({
    baseURL: import.meta.env.VITE_BASE_URL_SERVICES_GITHUB_API,
    timeout: 60000, // 60 seconds
    transform
  });
  
  return axiosClient;
};

export default initializeHttp();

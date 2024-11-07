import http from '@services/_http';

interface ILoginParams {
  username: string;
  password: string;
}

const VITE_BASE_URL_SERVICES_DUMMYJSON_API = import.meta.env.VITE_BASE_URL_SERVICES_DUMMYJSON_API;

export default {
  login: (params: ILoginParams): Promise<any> => {
    return http.requestToServer({
      baseURL: VITE_BASE_URL_SERVICES_DUMMYJSON_API,
      url: '/auth/login',
      method: 'POST',
      data: params
    }, true);
  },
  user: (): Promise<any> => {
    return http.requestToServer({
      baseURL: VITE_BASE_URL_SERVICES_DUMMYJSON_API,
      url: '/auth/me',
      method: 'GET'
    });
  },
  refresh: (): Promise<any> => {
    return http.requestToServer({
      baseURL: VITE_BASE_URL_SERVICES_DUMMYJSON_API,
      url: '/auth/refresh',
      method: 'GET'
    });
  }
};

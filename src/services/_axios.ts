/* eslint-disable max-len */
import axios from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios';

interface TransformOptions {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  responseInterceptors?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  responseInterceptorsError?: (error: AxiosError) => Promise<AxiosError> | any;
}

interface AxiosClientOptions extends CreateAxiosDefaults<any> {
  transform?: TransformOptions;
}

class AxiosClient {
  private options: AxiosClientOptions;
  private instance: AxiosInstance;

  constructor (options: AxiosClientOptions = {}) {
    this.options = options;
    this.instance = axios.create(options);
    this.instanceSettings();
  }

  private instanceSettings (): void {
    const {
      transform: {
        requestInterceptors,
        responseInterceptors,
        responseInterceptorsError
      } = {}
    } = this.options;

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof requestInterceptors === 'function') {
          return requestInterceptors(config);
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      responseInterceptors,
      responseInterceptorsError
    );
  }

  public requestToServer (configuration: AxiosRequestConfig, isRefreshToken: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.request(configuration)
        .then((response: AxiosResponse) => {
          if (isRefreshToken) {
            resolve(response);
          }
          else {
            resolve(response.data);
          }
        })
        .catch((error: AxiosError) => {
          reject(error.response?.data);
        });
    });
  }
}

export default AxiosClient;

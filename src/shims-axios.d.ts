import type { AxiosInstance } from 'axios';

declare module 'axios' {
  export interface AxiosInstance {
    <T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
    <T = any, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  }
}

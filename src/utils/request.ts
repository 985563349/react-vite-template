import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 3000,
});

type HttpStatus = 400 | 401 | 500 | 'ECONNABORTED';

const httpExceptionFilter: Record<HttpStatus | 'default', (ctx: any) => void> = {
  400: (ctx) => {
    console.error(400);
  },

  401: () => {
    console.error(401);
  },

  500: (ctx) => {
    console.error(500);
  },

  ECONNABORTED: () => {
    console.log('time out');
  },

  default: () => {
    console.error('unknown exception');
  },
};

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    // 请求统一异常拦截
    const status: HttpStatus = response?.status;
    const handler = httpExceptionFilter[status] ?? httpExceptionFilter.default;
    handler(response);

    return Promise.reject(error);
  }
);

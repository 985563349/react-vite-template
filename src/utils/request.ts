import axios from 'axios';

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 3000,
});

type AxiosResponseStatus = 400 | 401 | 403 | 500 | 'ECONNABORTED';

const httpExceptionHandler: Record<
  AxiosResponseStatus | 'default',
  (ctx: any) => void
> = {
  400: (ctx) => {
    console.error(400);
  },

  401: (ctx) => {
    console.error(401);
  },

  403: () => {
    window.postMessage('AUTH:LOGOUT');
    console.error('403');
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
    return response.data;
  },
  (error) => {
    const { response } = error;

    // Unified exception interception
    const status: AxiosResponseStatus = response?.status;
    const handler =
      httpExceptionHandler[status] ?? httpExceptionHandler.default;
    handler(response);

    return Promise.reject(error);
  }
);

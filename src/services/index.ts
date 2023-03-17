import { request } from '@/utils/request';

export const login = (data: any) => {
  return request('/login', {
    method: 'POST',
    data,
  });
};

export const logout = () => {
  return request('/logout', {
    method: 'POST',
  });
};

export const fetchUserInfo = () => {
  return request('/user', {
    method: 'GET',
  });
};

import { request } from '@/utils/request';

export interface UserAccount {
  username: string;
  password: string;
}

export const login = (data: UserAccount) => {
  return request<{ token: string }>({
    url: '/login',
    method: 'POST',
    data,
  });
};

export const logout = () => {
  return request({
    url: '/logout',
    method: 'POST',
  });
};

export interface UserInfo {
  username: string;
}

export const fetchUserInfo = () => {
  return request<UserInfo>({
    url: '/user',
    method: 'GET',
  });
};

interface UserAccount {
  username: string;
  password: string;
}

export const signIn = (account: UserAccount): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000, 'TOKEN');
  });
};

export const signOut = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

interface UserInfo {
  username: string;
}

export const fetchUserInfo = () => {
  return new Promise<UserInfo>((resolve, reject) => {
    setTimeout(resolve, 1000, { username: 'username' });
  });
};

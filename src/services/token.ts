import { User } from '../types/user/user';

const AUTH_TOKEN_NAME = 'green-api-token';
const AUTH_ID_NAME = 'green-api-id';

export const getToken = (): string => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  return token ?? '';
};

export const setToken = (user: User): void => {
  localStorage.setItem(AUTH_TOKEN_NAME, user.token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_NAME);
};

export const getId = (): string => {
  const token = localStorage.getItem(AUTH_ID_NAME);
  return token ?? '';
};

export const setId = (user: User): void => {
  localStorage.setItem(AUTH_ID_NAME, user.id);
};

export const dropId = (): void => {
  localStorage.removeItem(AUTH_ID_NAME);
};

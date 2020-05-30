import * as http from './http.api';
import { Credentials } from 'auth/auth.type';
import { Token } from './token.api';

export const refreshAccessToken = () => {
  return http.post(`/auth/token`, {
    referenceToken: Token.getAccessToken(),
  });
};

export const signIn = (credentials: Credentials) => {
  return http.post(`/auth/signin`, credentials);
};

export const getCurrentUser = () => {
  return http.get(`/user`);
};

export const signOut = () => {
  return http.get(`/auth/signout`);
};

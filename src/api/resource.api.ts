import * as http from './http.api';
import { Credentials } from 'auth/auth.type';

export const refreshAccessToken = () => {
  return http.post(`/auth/token`, {
    referenceToken: '',
  });
};

export const signIn = (credentials: Credentials) => {
  return http.post(`/auth/signin`, credentials);
};

export const getCurrentUser = () => {
  return http.get(`/user`);
};

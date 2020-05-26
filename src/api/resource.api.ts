import * as http from './http.api';

export const refreshAccessToken = () => {
  return http.post(`/auth/token`, {
    referenceToken: '',
  });
};

import React from 'react';

import { AuthState } from 'auth/auth.type';
import { initialState } from 'auth/auth.state';

export const useAuth = (): AuthState => {
  const [auth, setAuth] = React.useState<AuthState>(initialState);

  const setCurrentAuth = React.useCallback((currentAuth: AuthState): void => {
    setAuth({ ...currentAuth });
  }, []);

  return {
    ...auth,
    setCurrentAuth,
  };
};

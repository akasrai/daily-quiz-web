import React from 'react';

import { initialState } from 'auth/auth.state';
import { AuthState, User } from 'auth/auth.type';

export const useAuth = (): AuthState => {
  const [auth, setAuth] = React.useState<AuthState>(initialState);
  const [user, setUser] = React.useState<User>(initialState.user);

  const setCurrentUser = React.useCallback((currentUser: User): void => {
    setUser({ ...currentUser });
  }, []);

  const setCurrentAuth = React.useCallback((currentAuth: AuthState): void => {
    setAuth({ ...currentAuth });
  }, []);

  return {
    ...auth,
    user,
    setCurrentAuth,
    setCurrentUser,
  };
};

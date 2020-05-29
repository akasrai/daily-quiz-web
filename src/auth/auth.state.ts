import { AuthState, Action } from 'auth/auth.type';
import { updateObject } from 'helper/common-helper';
import { securedLS } from 'helper/local-storage-helper';

const AUTH = 'AUTH';
export const AUTH_LS_KEY = '_lst';
export const SIGN_OUT = `${AUTH}_SIGN_OUT`;
export const RESTORE_AUTH = 'RESTORE_AUTH';
export const SIGN_IN_ERROR = `${AUTH}_SIGN_IN_ERROR`;
export const SIGN_IN_PENDING = `${AUTH}_SIGN_IN_PENDING`;
export const SIGN_IN_SUCCESS = `${AUTH}_SIGN_IN_SUCCESS`;

export const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    photo: '',
  },
  token: '',
  roles: [],
  isSigningIn: false,
  isAuthenticated: false,
  setCurrentAuth: () => null,
};

export const reducer = (
  state: AuthState = initialState,
  action: Action
): any => {
  switch (action.type) {
    case SIGN_IN_PENDING:
      return updateObject(state, {
        isSigningIn: true,
      });

    case SIGN_IN_SUCCESS:
      securedLS.set(AUTH_LS_KEY, action.payload);

      return updateObject(state, {
        isSigningIn: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        roles: action.payload.roles,
      });

    case SIGN_IN_ERROR:
      return updateObject(state, {
        isSigningIn: false,
      });

    case SIGN_OUT:
      securedLS.clear(AUTH_LS_KEY);

      return updateObject(state, {
        ...initialState,
      });

    case RESTORE_AUTH:
      return updateObject(state, {
        isSigningIn: false,
        isAuthenticated: true,
        ...action.payload,
      });

    default:
      return state;
  }
};

import { AuthState, Action } from 'auth/auth.type';
import { updateObject } from 'helper/common-helper';

const AUTH = 'AUTH';
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
  provider: 'Google',
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

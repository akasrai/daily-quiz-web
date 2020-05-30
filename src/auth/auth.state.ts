import { AuthState, Action } from 'auth/auth.type';
import { updateObject } from 'helper/common-helper';
import { securedLS } from 'helper/local-storage-helper';
import { Token } from 'api/token.api';

const AUTH = 'AUTH';
export const AUTH_LS_KEY = '_lst';
export const UPDATE_USER = 'UPDATE_USER';
export const RESTORE_AUTH = 'RESTORE_AUTH';
export const SIGN_IN_ERROR = `${AUTH}_SIGN_IN_ERROR`;
export const SIGN_IN_PENDING = `${AUTH}_SIGN_IN_PENDING`;
export const SIGN_IN_SUCCESS = `${AUTH}_SIGN_IN_SUCCESS`;
export const SIGN_OUT_ERROR = `${AUTH}_SIGN_IN_ERROR`;
export const SIGN_OUT_PENDING = `${AUTH}_SIGN_OUT_PENDING`;
export const SIGN_OUT_SUCCESS = `${AUTH}_SIGN_OUT_SUCCESS`;

export const initialState: AuthState = {
  user: {
    name: '',
    email: '',
    photo: '',
  },
  token: '',
  roles: [],
  isHandlingAuth: false,
  isAuthenticated: false,
  setCurrentUser: () => null,
  setCurrentAuth: () => null,
};

export const reducer = (
  state: AuthState = initialState,
  action: Action
): any => {
  switch (action.type) {
    case SIGN_IN_PENDING:
    case SIGN_OUT_PENDING:
      return updateObject(state, {
        isHandlingAuth: true,
      });

    case SIGN_IN_SUCCESS:
      Token.setAccessToken(action.payload.token);
      securedLS.set(AUTH_LS_KEY, action.payload);

      return updateObject(state, {
        isHandlingAuth: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        roles: action.payload.roles,
      });

    case SIGN_IN_ERROR:
      Token.deleteAccessToken();
      return updateObject(state, {
        isHandlingAuth: false,
      });

    case SIGN_OUT_ERROR:
      return updateObject(state, {
        isHandlingAuth: false,
      });

    case SIGN_OUT_SUCCESS:
      Token.deleteAccessToken();
      securedLS.clear(AUTH_LS_KEY);

      return updateObject(state, {
        ...initialState,
      });

    case UPDATE_USER:
      const { data } = securedLS.get(AUTH_LS_KEY);
      securedLS.set(AUTH_LS_KEY, { ...data, user: action.payload.user });

      return updateObject(state, {
        ...state,
        isHandlingAuth: false,
        user: action.payload.user,
      });

    case RESTORE_AUTH:
      Token.setAccessToken(action.payload.token);

      return updateObject(state, {
        isHandlingAuth: false,
        isAuthenticated: true,
        ...action.payload,
      });

    default:
      return state;
  }
};

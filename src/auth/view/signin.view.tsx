import React, { useContext, useReducer, useState, useEffect } from 'react';

import * as auth from 'auth/auth.state';
import { ApiResponse } from 'api/api.type';
import { AuthContext } from 'auth/auth.context';
import { Action, Credentials } from 'auth/auth.type';
import { signIn, getCurrentUser } from 'api/resource.api';
import { securedLS } from 'helper/local-storage-helper';

import { Input } from 'ui/form/input';
import { Button } from 'ui/form/button';
import { ErrorAlert } from 'ui/form/alert';

const handleSignIn = async (event: any, dispatch: (props: any) => void) => {
  event.preventDefault();
  dispatch({ type: auth.SIGN_IN_PENDING });
  const { data, error } = await signIn({
    email: event.target[0].value,
    password: event.target[1].value,
  });

  if (error) {
    return dispatch({ type: auth.SIGN_IN_ERROR });
  }

  dispatch({
    type: auth.SIGN_IN_SUCCESS,
    payload: { token: data.token, roles: data.roles },
  });
};

const restoreAuthentication = (dispatch: (props: Action) => void) => {
  dispatch({ type: auth.SIGN_IN_PENDING });
  const { data }: ApiResponse = securedLS.get(auth.AUTH_LS_KEY);

  if (data) {
    return dispatch({ type: auth.RESTORE_AUTH, payload: data });
  }

  dispatch({ type: auth.SIGN_IN_ERROR });
};

const SigninForm = () => {
  const [checkAuth, setCheckAuth] = useState<boolean>(true);
  const { setCurrentAuth, isSigningIn } = useContext(AuthContext);
  const [authState, dispatch] = useReducer(auth.reducer, auth.initialState);

  useEffect(() => {
    setCurrentAuth(authState);

    if (checkAuth) {
      setCheckAuth(false);
      restoreAuthentication(dispatch);
    }
  }, [authState]);

  return (
    <form
      className="col-12 p-md-3 p-0"
      onSubmit={(e) => handleSignIn(e, dispatch)}
    >
      <ErrorAlert show={true} message="Fuck you" />
      <Input
        type="email"
        name="email"
        required={true}
        placeholder="Email"
        className={`${false ? 'is-invalid ' : ''}form-control`}
      />
      <Input
        type="password"
        name="password"
        required={true}
        placeholder="Password"
        className={`${false ? 'is-invalid ' : ''}form-control`}
      />
      <Button name="Sign in" disabled={isSigningIn} className="btn-primary" />
    </form>
  );
};

const SigninView = () => {
  return (
    <div className="login-layout">
      <div className="left-bubble"></div>
      <div className="right-bubble"></div>
      <div className="wave one"></div>
      <div className="wave two"></div>
      <div className="wave three"></div>
      <div className="row justify-content-center m-4">
        <div className="col-md-4 p-5 rounded bg-white login-form">
          <h3 className="text-primary ml-md-3 ml-0 mb-3">Welcome back :)</h3>
          <SigninForm />
        </div>
      </div>
    </div>
  );
};

export default SigninView;

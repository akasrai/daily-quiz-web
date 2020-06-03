import React, { useContext, useReducer, useState, useEffect } from 'react';

import * as auth from 'auth/auth.state';
import { Action } from 'auth/auth.type';
import { signIn } from 'api/resource.api';
import { ApiResponse } from 'api/api.type';
import { AuthContext } from 'auth/auth.context';
import { securedLS } from 'helper/local-storage-helper';

import { Input } from 'ui/form/input';
import { Button } from 'ui/form/button';
import { ErrorAlert } from 'ui/alert/inline-alert';
import { FlexRow } from 'ui/layout/component/flex';
import BubbleBackground from 'ui/layout/bubble-background.layout';

const handleSignIn = async (
  event: any,
  dispatch: (props: any) => void,
  setSignInError: (error: string) => void
) => {
  event.preventDefault();
  dispatch({ type: auth.SIGN_IN_PENDING });

  const { data, error } = await signIn({
    email: event.target[0].value,
    password: event.target[1].value,
  });

  if (error) {
    setSignInError(error.message);
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
  const [signInError, setSignInError] = useState<String>('');
  const { setCurrentAuth, isHandlingAuth } = useContext(AuthContext);
  const [authState, dispatch] = useReducer(auth.reducer, auth.initialState);

  useEffect(() => {
    setCurrentAuth(authState);

    if (checkAuth) {
      setCheckAuth(false);
      restoreAuthentication(dispatch);
    }
  }, [authState, checkAuth, setCheckAuth, setCurrentAuth]);

  return (
    <form
      className="col-12 p-md-3 p-0"
      onChange={() => setSignInError('')}
      onSubmit={(e) => handleSignIn(e, dispatch, setSignInError)}
    >
      <ErrorAlert message={signInError} />
      <Input
        type="email"
        name="email"
        required={true}
        placeholder="Email"
        className={`${signInError ? 'is-invalid ' : ''}`}
      />
      <Input
        type="password"
        name="password"
        required={true}
        placeholder="Password"
        className={`${signInError ? 'is-invalid ' : ''}`}
      />
      <Button
        name="Sign in"
        disabled={isHandlingAuth}
        className="md btn-primary"
      />
    </form>
  );
};

const SigninView = () => {
  return (
    <BubbleBackground className="fixed-height-layout">
      <FlexRow className="justify-content-center">
        <div className="col-md-4 p-5 rounded bg-white login-form">
          <h3 className="text-primary ml-md-3 ml-0 mb-3">Welcome back :)</h3>
          <SigninForm />
        </div>
      </FlexRow>
    </BubbleBackground>
  );
};

export default SigninView;

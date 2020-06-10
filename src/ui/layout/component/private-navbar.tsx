import React, { useMemo, useState, useContext, useReducer } from 'react';

import { Flex } from './flex';
import * as auth from 'auth/auth.state';
import { Action } from 'auth/auth.type';
import { signOut } from 'api/resource.api';
import { AuthContext } from 'auth/auth.context';

const getPageName = (): String => {
  return window.location.pathname
    .split('/')
    .map((path) => {
      return path.charAt(0).toUpperCase() + path.slice(1);
    })
    .join(' ')
    .slice(1);
};

const handleSignOut = async (
  dispatch: (props: Action) => void,
  setIsSignedOut: (prop: boolean) => void
) => {
  dispatch({ type: auth.SIGN_OUT_PENDING });
  const { error } = await signOut();

  if (error) {
    return dispatch({ type: auth.SIGN_OUT_ERROR });
  }

  dispatch({ type: auth.SIGN_OUT_SUCCESS });
  setIsSignedOut(true);
};

const PrivateNavBar = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);
  const { user, isHandlingAuth } = useContext(AuthContext);
  const { setCurrentAuth } = React.useContext(AuthContext);
  const [authState, dispatch] = useReducer(auth.reducer, auth.initialState);

  useMemo(() => {
    if (isSignedOut) {
      setCurrentAuth(authState);
    }
  }, [isSignedOut, authState, setCurrentAuth]);

  return (
    <section className="col-12 p-4 mt-1">
      <Flex className="justify-content-between text-white pr-md-3 pl-md-3">
        <div className="col-md-3 p-0">
          <div className="d-flex">
            <i className="icon ion-md-school h3 mr-2 m-0" />
            <span className=" p pt-1">
              Daily<span className="bold">Quiz</span>
            </span>
          </div>
        </div>
        <div className="col-md-6 p-0 d-none d-md-block">
          <div className="d-flex ">
            <span className="bold lead page-title">{getPageName()}</span>
          </div>
        </div>
        <div className="col-md-3 p-0">
          <div className="d-flex user-tool">
            <i className="icon ion-md-contact h3 mr-2 m-0" />
            <button className="bold p pt-1 user-tool-btn">
              <span className="d-none d-md-inline"> {user?.name} </span>
              <i className="icon ion-ios-arrow-down ml-2" />
              <div className="dropdown text-muted">
                <div className="list shake">
                  <i className="icon ion-md-contact mr-2 m-0 d-inline-block" />
                  Profile
                </div>

                {isHandlingAuth ? (
                  <div className="list shake text-muted">
                    <i className="icon ion-md-power mr-2 m-0 d-inline-block" />
                    Signing out...
                  </div>
                ) : (
                  <div
                    className="list shake"
                    onClick={() => handleSignOut(dispatch, setIsSignedOut)}
                  >
                    <i className="icon ion-md-power mr-2 m-0 d-inline-block" />
                    Sign Out
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </Flex>
    </section>
  );
};

export default PrivateNavBar;

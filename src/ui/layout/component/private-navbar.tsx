import React, {
  useMemo,
  useState,
  ReactNode,
  useContext,
  useReducer,
} from 'react';
import Flex from './flex';
import * as auth from 'auth/auth.state';
import { Action } from 'auth/auth.type';
import { signOut } from 'api/resource.api';
import { AuthContext } from 'auth/auth.context';

interface NavbarProps {
  children?: ReactNode;
}

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
  }, [isSignedOut]);

  return (
    <section className="col-12 p-4 mt-1">
      <Flex className="justify-content-between text-white">
        <div className="d-flex">
          <i className="icon ion-md-school h3 mr-2 m-0" />
          <span className=" p pt-1">
            Daily<span className="bold">Quiz</span>
          </span>
        </div>
        <div className="w-50 d-flex">
          <span className="bold p pt-1">Home</span>
        </div>
        <div className="d-flex user-tool">
          <i className="icon ion-md-contact h3 mr-2 m-0" />
          <button className="bold p pt-1 user-tool-btn">
            {user?.name} <i className="icon ion-ios-arrow-down ml-2" />
            <div className="dropdown text-muted">
              <div className="list shake">
                <i className="icon ion-md-contact mr-2 m-0 d-inline-block" />
                Profile
              </div>

              {isHandlingAuth ? (
                <div className="list shake text-muted">
                  {' '}
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
      </Flex>
    </section>
  );
};

export default PrivateNavBar;

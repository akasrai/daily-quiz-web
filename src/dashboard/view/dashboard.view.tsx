import React, { useReducer, useEffect, useContext, useState } from 'react';

import * as auth from 'auth/auth.state';
import { AuthContext } from 'auth/auth.context';
import { getCurrentUser } from 'api/resource.api';
import AuthenticatedLayout from 'ui/layout/authenticated.layout';

const getUser = async (dispatch: (props: any) => void) => {
  dispatch({ type: auth.SIGN_IN_PENDING });
  const { data, error } = await getCurrentUser();

  if (error) {
    return dispatch({ type: auth.SIGN_IN_ERROR });
  }

  dispatch({
    type: auth.UPDATE_USER,
    payload: {
      user: { name: data.fullName, photo: data.photo, email: data.email },
    },
  });
};

const DashboardView = () => {
  const { setCurrentUser, user } = useContext(AuthContext);
  const [isUserFetched, setIsUserFetched] = useState<boolean>(false);
  const [authState, dispatch] = useReducer(auth.reducer, auth.initialState);

  useEffect(() => {
    setCurrentUser(authState.user);

    if (!isUserFetched) {
      getUser(dispatch);
      setIsUserFetched(true);
    }
  }, [authState, isUserFetched, setCurrentUser]);

  return (
    <AuthenticatedLayout>
      <h3 className="p-3">
        Hi, <span className="bold">{user.name}!</span>
      </h3>
    </AuthenticatedLayout>
  );
};

export default DashboardView;

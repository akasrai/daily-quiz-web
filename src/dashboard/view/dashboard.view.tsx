import React, { useReducer, useEffect, useContext, useState } from 'react';

import { User } from 'auth/auth.type';
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
  const [authState, dispatch] = useReducer(auth.reducer, auth.initialState);

  useEffect(() => {
    setCurrentUser(authState.user);

    if (!user?.email) {
      getUser(dispatch);
    }
  }, [authState.user]);

  return <AuthenticatedLayout>Fuck Dashboard</AuthenticatedLayout>;
};

export default DashboardView;

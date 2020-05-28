import React from 'react';
import { Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { ROUTE } from './app.route-path';
import { history } from 'app/app.history';
import LoginView from 'auth/view/login.view';
import PageNotFound from 'layout/404.layout';
import { ReloadRoute } from 'common/route/reload-route';

const AuthenticatedRoute = (props: any) => {
  const isSignedIn = false;

  return isSignedIn ? <Route {...props} /> : <ReloadRoute to={ROUTE.HOME} />;
};

const PrivateRoute = withRouter(AuthenticatedRoute);

const NonAuthenticatedRoute = (props: any) => {
  const isSignedIn = false;

  return isSignedIn ? <Redirect to={ROUTE.DASHBOARD} /> : <Route {...props} />;
};

const PublicRoute = withRouter(NonAuthenticatedRoute);

const AppRoutes = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path={ROUTE.HOME} component={LoginView} />
      <PrivateRoute exact path={ROUTE.DASHBOARD} component={LoginView} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export default AppRoutes;

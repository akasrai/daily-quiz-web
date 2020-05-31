import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTE } from 'app/app.route-path';
import SeasonView from './view/season.view';
import { PrivateRoute } from 'app/app.routes';

const QuizRoutes = () => (
  <Switch>
    <PrivateRoute exact path={ROUTE.QUIZ_SEASON} component={SeasonView} />
  </Switch>
);

export default QuizRoutes;

import React from 'react';
import { Switch } from 'react-router-dom';

import { ROUTE } from 'app/app.route-path';
import SeasonView from './view/season.view';
import { PrivateRoute } from 'app/app.routes';
import QuestionView from './view/question.view';

const QuizRoutes = () => (
  <Switch>
    <PrivateRoute exact path={ROUTE.QUIZ_SEASON} component={SeasonView} />
    <PrivateRoute exact path={ROUTE.QUIZ_QUESTION} component={QuestionView} />
  </Switch>
);

export default QuizRoutes;

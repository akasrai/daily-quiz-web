import React, { useState, useEffect } from 'react';

import Hr from 'ui/form/hr';
import Flex from 'ui/layout/component/flex';
import AuthenticatedLayout from 'ui/layout/authenticated.layout';
import { getCurrentSeason } from 'api/resource.api';
import { QuizSeason } from 'daily-quiz/daily-quiz.type';
import { Button } from 'ui/form/button';

const getActiveSeason = async (setActiveSeason: (prop: QuizSeason) => void) => {
  const { data, error } = await getCurrentSeason();

  if (error) {
    return;
  }

  setActiveSeason(data);
};

const Header = () => {
  return (
    <Flex className="justify-content-between">
      <h5 className="col-md-9 p-0 text-muted">Season</h5>
    </Flex>
  );
};

const SeasonView = () => {
  const [activeSeason, setActiveSeason] = useState<QuizSeason>();

  useEffect(() => {
    getActiveSeason(setActiveSeason);
  }, []);

  return (
    <AuthenticatedLayout>
      <Header />
      <Hr />
      <span className="h2">{activeSeason?.title}</span>{' '}
      <span className="active-season small">ACTIVE</span>
      <p>Hosted on: {activeSeason?.createdAt}</p>
      <p>Duration: {activeSeason?.duration}</p>
      <p>{activeSeason?.description}</p>
      <Button
        name="End Season"
        disabled={false}
        icon="md-power"
        className="md btn-danger col-md-2"
      />
    </AuthenticatedLayout>
  );
};

export default SeasonView;

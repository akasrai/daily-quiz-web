import { toast } from 'react-toastify';
import React, { useState, useEffect, Fragment } from 'react';

import {
  Top10SeasonStats,
  CreateSeasonProps,
} from 'daily-quiz/daily-quiz.type';
import {
  SeasonStats,
  CurrentSeason,
} from 'daily-quiz/component/season-stats.component';
import Hr from 'ui/form/hr';
import { Button } from 'ui/form/button';
import { FlexRow } from 'ui/layout/component/flex';
import { ErrorMessage } from 'ui/alert/toast-alert';
import { getTop10SeasonStats } from 'api/resource.api';
import AuthenticatedLayout from 'ui/layout/authenticated.layout';
import CreateSeason from 'daily-quiz/component/create-season.component';

interface HeaderProps {
  createSeason: boolean;
  isSeasonActive: boolean;
  setCreateSeason: (prop: boolean) => void;
}

const getSeasonStats = async (
  setSeasonStats: (prop: Array<Top10SeasonStats>) => void
) => {
  const { data, error } = await getTop10SeasonStats();

  if (error) {
    return toast.error(<ErrorMessage message={error.message} />);
  }

  setSeasonStats(data.result);
};

const Header = ({
  createSeason,
  isSeasonActive,
  setCreateSeason,
}: HeaderProps) => {
  const btnCSS = createSeason
    ? 'btn-outline-danger'
    : 'btn-outline-default text-primary';
  const icon = createSeason ? 'close-circle-outline' : 'add-circle-outline';

  return (
    <FlexRow className="justify-content-between">
      <h5 className="col-md-9 p-0 text-muted text-md-left text-center">
        {createSeason ? 'Host new Season' : 'Last 10 Seasons'}
      </h5>
      {!isSeasonActive && (
        <Button
          icon={`md-${icon}`}
          name={createSeason ? 'Cancel' : 'New Season'}
          onClick={() => setCreateSeason(!createSeason)}
          className={`sm ${btnCSS} col-md-2  mt-2 mt-md-0`}
        />
      )}
    </FlexRow>
  );
};

const NewSeason = ({ setCreateSeason }: CreateSeasonProps) => (
  <FlexRow className="justify-content-center">
    <div className="col-md-8">
      <CreateSeason setCreateSeason={setCreateSeason} />
    </div>
  </FlexRow>
);

const isSeasonActive = (seasonSats: Array<Top10SeasonStats> = []) =>
  seasonSats.find((season) => season.active === true) ? true : false;

const SeasonView = () => {
  const [seasonEnded, setSeasonEnded] = useState<boolean>(false);
  const [createSeason, setCreateSeason] = useState<boolean>(false);
  const [seasonSats, setSeasonStats] = useState<Array<Top10SeasonStats>>();

  useEffect(() => {
    if (!createSeason) getSeasonStats(setSeasonStats);
  }, [seasonEnded, createSeason]);

  return (
    <AuthenticatedLayout>
      <Header
        createSeason={createSeason}
        setCreateSeason={setCreateSeason}
        isSeasonActive={isSeasonActive(seasonSats) || false}
      />
      <Hr className="mt-3" />
      {createSeason && <NewSeason setCreateSeason={setCreateSeason} />}
      {!createSeason &&
        seasonSats?.map((season: Top10SeasonStats, key: number) => (
          <Fragment key={key}>
            {!season.active && <SeasonStats season={season} />}
            {season.active && (
              <CurrentSeason setSeasonEnded={setSeasonEnded} season={season} />
            )}
            <Hr />
          </Fragment>
        ))}
    </AuthenticatedLayout>
  );
};

export default SeasonView;

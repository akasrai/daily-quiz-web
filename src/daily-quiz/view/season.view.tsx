import React, { useState, useEffect, Fragment } from 'react';

import {
  Winner,
  QuizSeason,
  Top10SeasonStats,
} from 'daily-quiz/daily-quiz.type';
import Hr from 'ui/form/hr';
import { Button } from 'ui/form/button';
import Flex from 'ui/layout/component/flex';
import Image from 'ui/layout/component/image';
import { getRomanOf } from 'helper/common-helper';
import { getTop10SeasonStats } from 'api/resource.api';
import AuthenticatedLayout from 'ui/layout/authenticated.layout';

const getSeasonStats = async (
  setSeasonStats: (prop: Array<Top10SeasonStats>) => void
) => {
  const { data, error } = await getTop10SeasonStats();

  if (error) {
    return;
  }

  setSeasonStats(data.result);
};

const Header = () => {
  return (
    <Flex className="justify-content-between">
      <h5 className="col-md-9 p-0 text-muted">Season</h5>
    </Flex>
  );
};

const CurrentSeason = ({ season }: { season: Top10SeasonStats }) => (
  <Flex className="justify-content-between">
    <div>
      <div>
        <span className="small text-muted">
          Season: {getRomanOf(season.season)}
          <span className="active-season ml-2">
            <span className="dot bg-white"></span>ACTIVE
          </span>
        </span>
        <span className="h3 d-block ">{season?.title}</span>
      </div>
      <DateDetail name="Hosted on" date={season.createdAt} />
      <DateDetail name="Ends on" date={season.endsAt} />
    </div>
    <div>
      <Button
        icon="md-power"
        name="End Season"
        disabled={false}
        className="sm btn-outline-danger"
      />
    </div>
  </Flex>
);

const WinnerStats = ({
  winner,
  position,
}: {
  winner: Winner;
  position: number;
}) => (
  <Flex className="justify-content-between pr-4">
    <Image className="player-image mr-3" src={winner.player.photo} />
    <div className="text-muted small">
      <span className="d-block bold text-primary">{winner.player.name}</span>
      <span className="d-block">
        <i className="icon ion-md-checkmark-circle-outline points mr-1" />
        Points: <span className="bold"> {winner.point}</span>
      </span>
      <span className="d-block">
        <i className="icon ion-md-medal position mr-1" />
        Position: <span className="bold"> {position}</span>
      </span>
      <span className="d-block">
        <i className="icon ion-md-cube game-played mr-1" />
        Game Played:<span className="bold"> {winner.gamePlayed}</span>
      </span>
    </div>
  </Flex>
);

const SeasonStats = ({ season }: { season: Top10SeasonStats }) => (
  <Fragment>
    <Flex>
      <span className="lead mb-3 bold text-muted">
        <span className="small mr-2 text-primary">
          Season: {getRomanOf(season.season)},
        </span>
        {season?.title}
      </span>
    </Flex>
    <Flex>
      <div className="col-md-3 p-0">
        <DateDetail name="Hosted on" date={season.createdAt} />
        <DateDetail name="Ended on" date={season.updatedAt} />
      </div>
      {season.winners.map((winner: Winner, key: number) => (
        <WinnerStats position={key + 1} winner={winner} />
      ))}
    </Flex>
  </Fragment>
);

const DateDetail = ({ name, date }: { name: string; date: string }) => (
  <span className="small d-block text-muted">
    <i className="icon ion-md-calendar mr-1" />
    {name}: <span className="bold">{date}</span>
  </span>
);

const SeasonView = () => {
  const [seasonSats, setSeasonStats] = useState<Array<Top10SeasonStats>>();

  useEffect(() => {
    getSeasonStats(setSeasonStats);
  }, []);

  return (
    <AuthenticatedLayout>
      <Header />
      <Hr />
      {seasonSats?.map((season: Top10SeasonStats) => (
        <Fragment>
          {season.active && <CurrentSeason season={season} />}
          {!season.active && <SeasonStats season={season} />}
          <Hr />
        </Fragment>
      ))}
    </AuthenticatedLayout>
  );
};

export default SeasonView;

import { toast } from 'react-toastify';
import React, { useState, Fragment } from 'react';

import {
  Winner,
  Top10SeasonStats,
  WinnerStatsProps,
  CurrentSeasonProps,
} from 'daily-quiz/daily-quiz.type';
import { Button } from 'ui/form/button';
import { history } from 'app/app.history';
import { ROUTE } from 'app/app.route-path';
import { FlexRow } from 'ui/layout/component/flex';
import { endSeason } from 'api/resource.api';
import Image from 'ui/layout/component/image';
import { getRomanOf } from 'helper/common-helper';
import { PopupAlert } from 'ui/alert/popup-alert';
import { VALIDATION } from 'daily-quiz/daily-quiz.constant';
import { ErrorMessage, SuccessMessage } from 'ui/alert/toast-alert';

const endCurrentSeason = async (
  setSeasonEnded: (prop: boolean) => void,
  setIsEndingSeason: (prop: boolean) => void
) => {
  setIsEndingSeason(true);
  const { error } = await endSeason();

  if (error) {
    setIsEndingSeason(false);
    return toast.error(<ErrorMessage message={error.message} />);
  }

  setSeasonEnded(true);
  setIsEndingSeason(false);
  toast.success(<SuccessMessage message={VALIDATION.SEASON_ENDED} />);
};

const WinnerStats = ({ winner, position }: WinnerStatsProps) => (
  <FlexRow className="justify-content-between pr-4 pt-3 pt-md-0">
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
  </FlexRow>
);

const DateDetail = ({ name, date }: { name: string; date: string }) => (
  <span className="small d-block text-muted">
    <i className="icon ion-md-calendar mr-1" />
    {name}: <span className="bold">{date}</span>
  </span>
);

export const SeasonStats = ({ season }: { season: Top10SeasonStats }) => (
  <Fragment>
    <FlexRow>
      <span className="lead mb-3 bold text-muted">
        <span className="small mr-2 text-success">
          Season: {getRomanOf(season.season)},
        </span>
        {season?.title}
      </span>
    </FlexRow>
    <FlexRow>
      <div className="col-md-3 p-0">
        <DateDetail name="Hosted on" date={season.createdAt} />
        <DateDetail name="Ended on" date={season.updatedAt} />
      </div>
      {season.winners.map((winner: Winner, key: number) => (
        <WinnerStats key={key} position={key + 1} winner={winner} />
      ))}
    </FlexRow>
  </Fragment>
);

export const CurrentSeason = ({
  season,
  setSeasonEnded,
}: CurrentSeasonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEndingSeason, setIsEndingSeason] = useState<boolean>(false);

  return (
    <FlexRow className="justify-content-between">
      <div>
        <div>
          <span className="small text-success">
            Season: {getRomanOf(season.season)}
            <span className="active-season ml-2">
              <span className="dot bg-white"></span>ACTIVE
            </span>
          </span>
          <span className="h3 d-block text-muted">{season?.title}</span>
        </div>
        <DateDetail name="Hosted on" date={season.createdAt} />
        <DateDetail name="Ends on" date={season.endsAt} />
      </div>
      <div>
        <PopupAlert
          className="danger"
          title="Are you sure?"
          message="Do you really want to end this Season?"
          alert={open}
          isTakingAction={isEndingSeason}
          toggleConfirmationBox={() => setOpen(!open)}
          asyncAction={() =>
            endCurrentSeason(setSeasonEnded, setIsEndingSeason)
          }
        />

        <Button
          disabled={false}
          name="Post Question"
          icon="md-add-circle-outline"
          className="sm btn-default text-primary"
          onClick={() => history.push(ROUTE.QUIZ_QUESTION)}
        />

        <Button
          icon="md-power"
          disabled={false}
          name="End Season"
          className="sm btn-danger"
          onClick={() => setOpen(true)}
        />
      </div>
    </FlexRow>
  );
};

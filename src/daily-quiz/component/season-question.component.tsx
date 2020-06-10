import { toast } from 'react-toastify';
import React, { useState, Fragment, useEffect } from 'react';

import {
  Winner,
  Answers,
  Top10SeasonStats,
  WinnerStatsProps,
  CurrentSeasonProps,
  CurrentSeasonQuestion,
} from 'daily-quiz/daily-quiz.type';
import { Button } from 'ui/form/button';
import { history } from 'app/app.history';
import { ROUTE } from 'app/app.route-path';
import { FlexRow } from 'ui/layout/component/flex';
import { endSeason, getAllCurrentSeasonQuestion } from 'api/resource.api';
import Image from 'ui/layout/component/image';
import { getRomanOf } from 'helper/common-helper';
import { PopupAlert } from 'ui/alert/popup-alert';
import {
  VALIDATION,
  category,
  getCategoryIcon,
} from 'daily-quiz/daily-quiz.constant';
import { ErrorMessage, SuccessMessage } from 'ui/alert/toast-alert';

const getCurrentSeasonQuestion = async (
  setQuestions: (props: Array<CurrentSeasonQuestion>) => void
) => {
  const { data, error } = await getAllCurrentSeasonQuestion();

  if (error) {
    return;
  }

  setQuestions(data.result);
};

const Question = ({ question }: { question: CurrentSeasonQuestion }) => (
  <div className="col-md-12 p-0">
    <div className="col-md-2 d-inline-block p-0 text-muted small">
      {question.createdAt}
    </div>
    <div className="col-md-6 d-inline-block p-0 bold">{question.question}</div>
    <div className="col-md-2 d-inline-block p-0 shake">
      <i
        className={`icon ion-md-${getCategoryIcon(
          question.category
        )} d-inline-block mr-2`}
      />
      {question.category}
    </div>
    <div className="col-md-2 d-inline-block p-0">{question.point}pts</div>
  </div>
);

const Options = ({ options }: { options: Array<Answers> }) => (
  <div className="col-md-12">
    <FlexRow>
      {options.map((option) => (
        <Fragment>
          <span>{option.answer}</span>
          <span>{option.correct}</span>
        </Fragment>
      ))}
    </FlexRow>
  </div>
);

const QuestionList = () => {
  const [questions, setQuestions] = useState<Array<CurrentSeasonQuestion>>();

  useEffect(() => {
    getCurrentSeasonQuestion(setQuestions);
  }, []);

  return (
    <FlexRow>
      {questions?.map((question) => (
        <Fragment>
          <Question question={question} />
          <Options options={question.answers} />
        </Fragment>
      ))}
    </FlexRow>
  );
};

export default QuestionList;

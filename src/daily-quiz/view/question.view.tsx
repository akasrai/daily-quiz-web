import React, { useState } from 'react';

import Hr from 'ui/form/hr';
import { Button } from 'ui/form/button';
import Flex from 'ui/layout/component/flex';
import AuthenticatedLayout from 'ui/layout/authenticated.layout';
import CreateQuestion from 'daily-quiz/component/create-question.component';

interface HeaderProps {
  createNewQuiz: boolean;
  setCreateNewQuiz: (prop: boolean) => void;
}

const Header = ({ setCreateNewQuiz, createNewQuiz }: HeaderProps) => {
  const btnCSS = createNewQuiz
    ? 'btn-outline-danger'
    : 'btn-outline-default text-primary';
  const icon = createNewQuiz ? 'close-circle-outline' : 'add-circle-outline';

  return (
    <Flex className="justify-content-between">
      <h5 className="col-md-9 p-0 m-0 text-muted">
        {createNewQuiz ? 'Create New Question' : 'Questions this Season'}
      </h5>
      <Button
        icon={`md-${icon}`}
        className={`sm ${btnCSS} col-md-2`}
        name={createNewQuiz ? 'Cancel' : 'New Quiz'}
        onClick={() => setCreateNewQuiz(!createNewQuiz)}
      />
    </Flex>
  );
};

const NewQuiz = () => (
  <Flex className="justify-content-center">
    <div className="col-md-8">
      <CreateQuestion />
    </div>
  </Flex>
);

const QuestionView = () => {
  const [createNewQuiz, setCreateNewQuiz] = useState<boolean>(false);

  return (
    <AuthenticatedLayout>
      <Header
        createNewQuiz={createNewQuiz}
        setCreateNewQuiz={setCreateNewQuiz}
      />
      <Hr className="mt-3" />
      {createNewQuiz && <NewQuiz />}
    </AuthenticatedLayout>
  );
};

export default QuestionView;

import React, { useState } from 'react';

import { Button } from 'ui/form/button';
import Flex from 'ui/layout/component/flex';
import { createQuiz } from 'api/resource.api';
import { InfoAlert, ErrorAlert } from 'ui/alert/inline-alert';
import { Input, TextArea, RadioButton, Select } from 'ui/form/input';
import { OptionPayload, QuizPayload } from 'daily-quiz/daily-quiz.type';
import { TOTAL_OPTIONS, category } from 'daily-quiz/daily-quiz.constant';

const handleCreateQuiz = async (
  e: any,
  setError: (error: String) => void,
  setIsCreating: (prop: boolean) => void
) => {
  e.preventDefault();
  setIsCreating(true);
  const quizPayload: QuizPayload = getFormData(e.target);
  const { error } = await createQuiz(quizPayload);

  if (error) {
    setIsCreating(false);
    return setError(error.message);
  }

  setIsCreating(false);
};

const getFormData = (inputs: any): QuizPayload => {
  const formData: any = {};
  const answers: Array<OptionPayload> = [];

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'radio') {
      if (inputs[i].checked)
        answers.push({ answer: inputs[i].value, correct: true });

      continue;
    }

    if (inputs[i].name.split('-')[0] === 'option') {
      if (!isPresent(inputs[i].value, answers))
        answers.push({ answer: inputs[i].value, correct: false });
      continue;
    }

    if (inputs[i].name) formData[inputs[i].name] = inputs[i].value;
  }

  return { ...formData, answers };
};

const isPresent = (answer: String, answers: Array<OptionPayload>) => {
  return answers.find((option) => option.answer === answer);
};

const CreateQuestion = () => {
  const [error, setError] = useState<String>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [options, setOptions] = useState<{ [key: string]: string }>({});

  return (
    <form onSubmit={(e) => handleCreateQuiz(e, setError, setIsCreating)}>
      <ErrorAlert message={error} />
      <TextArea
        type="text"
        name="question"
        required={true}
        placeholder="Question"
        className={`${error ? 'is-invalid ' : ''}`}
      />
      <Select
        name="category"
        required={true}
        options={category}
        className={'mb-2'}
        placeholder="Select Category"
      />
      <InfoAlert message="Checkmark on the left of the Option to set a correct Option." />

      {Array.from(Array(TOTAL_OPTIONS).keys()).map((key) => (
        <Flex key={key} className="justify-content-center pl-3 pr-3">
          <RadioButton
            name="options"
            required={true}
            hideLabel={true}
            id={`option-${key + 1}`}
            value={options[`option-${key + 1}`]}
          />
          <Input
            type="text"
            required={true}
            name={`option-${key + 1}`}
            placeholder={`Option ${key + 1}`}
            className={`${error ? 'is-invalid ' : ''}`}
            onChange={function (e) {
              setOptions({ ...options, [`option-${key + 1}`]: e.target.value });
            }}
          />
        </Flex>
      ))}

      <Button name="Create" disabled={isCreating} className="md btn-primary" />
    </form>
  );
};

export default CreateQuestion;

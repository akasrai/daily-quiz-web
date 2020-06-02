import { toast } from 'react-toastify';
import React, { useState } from 'react';

import { Button } from 'ui/form/button';
import { Input, TextArea } from 'ui/form/input';
import { hostNewSeason } from 'api/resource.api';
import { SuccessMessage } from 'ui/alert/toast-alert';
import { VALIDATION } from 'daily-quiz/daily-quiz.constant';
import { ErrorAlert, InfoAlert } from 'ui/alert/inline-alert';
import { SeasonPayload, CreateSeasonProps } from 'daily-quiz/daily-quiz.type';

interface HandlerProps {
  e: any;
  setError: (error: String) => void;
  setIsCreating: (prop: boolean) => void;
  setCreateSeason: (prop: boolean) => void;
}

const handleHostNewSeason = async (props: HandlerProps) => {
  const { e, setError, setIsCreating, setCreateSeason } = props;

  e.preventDefault();
  setIsCreating(true);
  const seasonPayload: SeasonPayload = getFormData(e.target);
  const { error } = await hostNewSeason(seasonPayload);

  if (error) {
    setIsCreating(false);
    return setError(error.message);
  }

  setIsCreating(false);
  setCreateSeason(false);
  toast.success(<SuccessMessage message={VALIDATION.SEASON_HOSTED} />);
};

const getFormData = (inputs: any): SeasonPayload => {
  const formData: any = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].name) formData[inputs[i].name] = inputs[i].value;
  }

  return formData;
};

const CreateSeason = ({ setCreateSeason }: CreateSeasonProps) => {
  const [error, setError] = useState<String>('');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <form
      onSubmit={(e) =>
        handleHostNewSeason({ e, setError, setIsCreating, setCreateSeason })
      }
    >
      <InfoAlert message="Enter the Season details below" />
      <ErrorAlert message={error} />
      <Input
        type="text"
        name="title"
        required={true}
        placeholder="Title"
        className={`${error ? 'is-invalid ' : ''}`}
      />
      <Input
        type="number"
        name="duration"
        required={true}
        placeholder="Duration"
        className={`${error ? 'is-invalid ' : ''}`}
      />
      <TextArea
        type="text"
        required={false}
        name="description"
        placeholder="Description..."
        className={`${error ? 'is-invalid ' : ''}`}
      />
      <Button
        icon="md-rocket"
        name="Host Season"
        disabled={isCreating}
        className="md btn-primary"
      />
    </form>
  );
};

export default CreateSeason;

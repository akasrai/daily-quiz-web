import React from 'react';
import { WhiteDottedLoader } from 'ui/icons/pending-icon';

interface ButtonProps {
  name: string;
  className: string;
  disabled: boolean;
}

export const Button = (props: ButtonProps) => {
  const { name, disabled, className } = props;

  return (
    <div className="col-12 p-0">
      <button
        type="submit"
        disabled={disabled}
        className={`btn btn-md ${className} btn-block`}
      >
        {disabled ? <WhiteDottedLoader /> : name}
      </button>
    </div>
  );
};

import React from 'react';

interface InputProps {
  type: string;
  name: string;
  className: string;
  required?: boolean;
  placeholder: string;
}

export const Input = (props: InputProps) => {
  const { type, name, className, required, placeholder } = props;

  return (
    <div className="col-12 form-group p-0">
      <input
        type={type}
        name={name}
        required={required}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};

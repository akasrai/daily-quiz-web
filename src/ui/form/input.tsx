import React from 'react';

interface Options {
  name: string;
  value: string;
}

interface InputProps {
  id?: string;
  name: string;
  type?: string;
  className?: string;
  required?: boolean;
  hideLabel?: boolean;
  placeholder?: string;
  value?: string | number;
  options?: Array<Options>;
  onChange?: (e: any) => void;
}

export const Input = (props: InputProps) => {
  const { type, name, className, onChange, required, placeholder } = props;

  return (
    <div className="col-12 form-group p-0">
      <input
        type={type}
        name={name}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={`${className} form-control`}
      />
    </div>
  );
};

export const TextArea = (props: InputProps) => {
  const { name, className, required, placeholder } = props;

  return (
    <div className="col-12 form-group p-0">
      <textarea
        name={name}
        rows={Number(4)}
        required={required}
        placeholder={placeholder}
        className={`${className} form-control`}
      ></textarea>
    </div>
  );
};

export const RadioButton = (props: InputProps) => {
  const { id, name, value, hideLabel, required } = props;

  return (
    <p>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        required={required}
      />
      <label htmlFor={id}>{!hideLabel && value}</label>
    </p>
  );
};

export const Select = (props: InputProps) => {
  const { name, placeholder, options = [], required, className } = props;

  return (
    <select
      name={name}
      className={`custom-select ${className}`}
      required={required}
    >
      <option value="">{placeholder}</option>
      {options.map((option, key) => (
        <option key={key} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

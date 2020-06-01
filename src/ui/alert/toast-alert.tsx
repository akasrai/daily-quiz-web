import React from 'react';

interface ToastProps {
  message: string;
}

export const SuccessMessage = ({ message }: ToastProps) => (
  <div className="d-flex">
    <i className="icon ion-md-checkmark-circle text-normal" />
    <span className="pl-2"> {message}</span>
  </div>
);

export const InfoMessage = ({ message }: ToastProps) => (
  <div className="d-flex">
    <i className="icon ion-md-information-circle text-normal" />
    <span className="pl-2"> {message}</span>
  </div>
);

export const ErrorMessage = ({ message }: ToastProps) => (
  <div className="d-flex">
    <i className="icon ion-md-remove-circle text-normal" />
    <span className="pl-2"> {message}</span>
  </div>
);

export const WarnMessage = ({ message }: ToastProps) => (
  <div className="d-flex">
    <i className="icon ion-md-warning text-normal" />
    <span className="pl-2"> {message}</span>
  </div>
);

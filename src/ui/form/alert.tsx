import React from 'react';

interface AlertProps {
  show: boolean;
  message: string;
}

export const ErrorAlert = (props: AlertProps) => {
  const { show, message } = props;

  return (
    <>
      {show && (
        <div className="alert alert-danger small p-2">
          <i className="icon ion-md-alert" /> {message}
        </div>
      )}
    </>
  );
};

export const InfoAlert = (props: AlertProps) => {
  const { show, message } = props;

  return (
    <>
      {show && (
        <div className="alert alert-info small p-2">
          <i className="icon ion-md-information-circle-outline" /> {message}
        </div>
      )}
    </>
  );
};

export const WarningAlert = (props: AlertProps) => {
  const { show, message } = props;

  return (
    <>
      {show && (
        <div className="alert alert-warning small p-2">
          <i className="icon ion-md-warning" /> {message}
        </div>
      )}
    </>
  );
};

export const SuccessAlert = (props: AlertProps) => {
  const { show, message } = props;

  return (
    <>
      {show && (
        <div className="alert alert-success small p-2">
          <i className="icon ion-md-checkmark-circle-outline" /> {message}
        </div>
      )}
    </>
  );
};

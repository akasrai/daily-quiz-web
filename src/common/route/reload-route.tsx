import React from 'react';

export const ReloadRoute = (props: any) => {
  window.location.replace(props.to);

  return <></>;
};

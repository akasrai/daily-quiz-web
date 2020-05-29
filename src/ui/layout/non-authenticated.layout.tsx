import React from 'react';
import { LayoutProps } from './layout.type';

const NonAuthenticatedLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default NonAuthenticatedLayout;

import React from 'react';
import { LayoutProps } from './layout.type';

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

export default AuthenticatedLayout;

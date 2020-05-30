import React from 'react';
import { LayoutProps } from './layout.type';
import PrivateNavBar from './component/private-navbar';
import BubbleBackground from './bubble-background.layout';

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  return (
    <BubbleBackground className="h-100">
      <PrivateNavBar />
      {children}
    </BubbleBackground>
  );
};

export default AuthenticatedLayout;

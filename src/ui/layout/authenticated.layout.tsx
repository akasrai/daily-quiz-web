import React from 'react';
import { LayoutProps } from './layout.type';
import PrivateNavBar from './component/private-navbar';
import BubbleBackground from './bubble-background.layout';
import PrivateSidebar from './component/private-sidebar';
import Flex from './component/flex';

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  return (
    <BubbleBackground className="h-100">
      <PrivateNavBar />
      <Flex className="justify-content-between">
        <PrivateSidebar />
        <div className="col-md-9">
          <div className="col-md-12 mr-3 rounded-5 p-4 bg-white h-100">
            {children}
          </div>
        </div>
      </Flex>
      <Flex className="justify-content-between p-3" />
    </BubbleBackground>
  );
};

export default AuthenticatedLayout;

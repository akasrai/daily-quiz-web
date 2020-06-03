import React from 'react';

import { FlexRow } from './component/flex';
import { LayoutProps } from './layout.type';
import PrivateNavBar from './component/private-navbar';
import BubbleBackground from './bubble-background.layout';
import PrivateSidebar from './component/private-sidebar';

const AuthenticatedLayout = ({ children }: LayoutProps) => {
  return (
    <BubbleBackground className="h-100">
      <PrivateNavBar />
      <FlexRow className="justify-content-between pr-md-3 pl-md-3">
        <PrivateSidebar />
        <div className="col-md-9">
          <div className="col-md-12 mr-3 rounded-5 p-md-5 p-3 bg-white h-100">
            {children}
          </div>
        </div>
      </FlexRow>
      <FlexRow className="justify-content-center p-5">
        <span>
          &copy; 2020 Daily<span className="bold">Quiz</span>
        </span>
      </FlexRow>
    </BubbleBackground>
  );
};

export default AuthenticatedLayout;

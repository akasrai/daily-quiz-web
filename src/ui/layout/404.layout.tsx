import React from 'react';
import BubbleBackground from './bubble-background.layout';

const PageNotFound = () => {
  return (
    <BubbleBackground className="fixed-height-layout ">
      <div className="d-flex justify-content-center align-items-center h-100">
        <h3 className="text-danger">404 | Not Found</h3>
      </div>
    </BubbleBackground>
  );
};

export default PageNotFound;

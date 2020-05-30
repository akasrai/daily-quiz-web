import React from 'react';
import { LayoutProps } from './layout.type';

const BubbleBackground = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className={`bubble-background ${className}`}>
      <div className="left-bubble"></div>
      <div className="right-bubble"></div>
      <div className="bring-to-front">{children}</div>
    </div>
  );
};

export default BubbleBackground;

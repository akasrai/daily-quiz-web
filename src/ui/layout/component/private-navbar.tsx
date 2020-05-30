import React, { ReactNode, useContext } from 'react';
import { AuthContext } from 'auth/auth.context';
import Flex from './flex';

interface NavbarProps {
  children?: ReactNode;
}

const PrivateNavBar = ({ children }: NavbarProps) => {
  const { user } = useContext(AuthContext);

  return (
    <section className="col-12 p-4 mt-1">
      <Flex className="justify-content-between text-white">
        <div className="d-flex">
          <i className="icon ion-md-contact h3 mr-2 m-0" />
          <span className="bold p pt-1">{user?.name}</span>
        </div>
        <div className="w-50 d-flex">
          <span className="bold p pt-1">Home</span>
        </div>
        <div className="d-flex">
          <span className="bold p pt-1">
            {user?.name} <i className="icon ion-ios-arrow-down ml-2" />
          </span>
        </div>
      </Flex>
    </section>
  );
};

export default PrivateNavBar;

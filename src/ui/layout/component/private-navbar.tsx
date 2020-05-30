import React, { ReactNode, useContext } from 'react';
import { AuthContext } from 'auth/auth.context';

interface NavbarProps {
  children?: ReactNode;
}

const PrivateNavBar = ({ children }: NavbarProps) => {
  let { user } = useContext(AuthContext);

  return (
    <section className="col-12 p-4 mt-1">
      <div className="container d-flex justify-content-between text-white">
        <div className="d-flex">
          <i className="icon ion-md-contact h3 mr-2 m-0" />
          <span className="bold h-4 pt-1">{user?.name}</span>
        </div>
        <div className="w-50 d-flex">
          <span className="bold h-4 pt-1">Home</span>
        </div>
        <div className="d-flex">
          <span className="bold h-4 pt-1">
            {user?.name} <i className="icon ion-ios-arrow-down ml-2" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default PrivateNavBar;

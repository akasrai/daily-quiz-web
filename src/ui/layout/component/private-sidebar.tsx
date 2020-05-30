import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { history } from 'app/app.history';
import { ROUTE } from 'app/app.route-path';

interface SidebarProps {
  children?: ReactNode;
}

interface TabProps {
  name: String;
  icon: String;
  route?: string;
  children?: ReactNode;
}

const redirectTo = (route: string = '/') => history.push(route);

const Tab = ({ name, icon, route, children }: TabProps) => (
  <div className="tab">
    <input
      type="radio"
      name="main-menu"
      id={name.split(' ').join('-')}
      onChange={() => redirectTo(route)}
    />
    <label className="tab-label" htmlFor={name.split(' ').join('-')}>
      <span className="shake p">
        <i className={`icon ion-${icon} p mr-3 m-0 d-inline-block`} />
        {name}
      </span>
      {children && (
        <i className="icon ion-ios-arrow-forward ml-2 arrow float-right" />
      )}
    </label>
    <div className="tab-content">{children}</div>
  </div>
);

const SubTab = ({ name, icon, route }: TabProps) => (
  <div className="sub-tab">
    <input type="radio" id={name.split(' ').join('-')} name="sub-menu" />
    <label className="sub-tab-label" htmlFor={name.split(' ').join('-')}>
      <span className="p pt-0 pl-3 small shake">
        <i className={`icon ion-${icon} p mr-3 m-0 d-inline-block`} />
        {name}
      </span>
    </label>
  </div>
);

const PrivateSidebar = ({ children }: SidebarProps) => {
  return (
    <section className="col-md-3">
      <div className="col-md-12 ml-2 p-0 pt-3 pb-3 rounded-5 bg-blue text-white h-100 p-sticky">
        <div className="tabs">
          <Tab name="Dashboard" icon="ios-home" route={ROUTE.DASHBOARD} />
          <Tab
            name="Quiz"
            icon="ios-help-circle"
            route={window.location.pathname}
          >
            <SubTab name="Seasons" icon="ios-arrow-forward" />
            <SubTab name="Questions" icon="ios-arrow-forward" />
          </Tab>
          <Tab name="Members" icon="md-contacts" route={ROUTE.DASHBOARD} />
          <Tab name="Settings" icon="md-construct" route={ROUTE.DASHBOARD} />
        </div>
      </div>
    </section>
  );
};

export default PrivateSidebar;

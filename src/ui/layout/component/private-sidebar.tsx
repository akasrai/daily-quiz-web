import React, { ReactNode } from 'react';

import { history } from 'app/app.history';
import { ROUTE } from 'app/app.route-path';

interface TabProps {
  name: String;
  icon?: String;
  route?: string;
  children?: ReactNode;
}

const sidebarMenu = {
  TAB: 'tab',
  SUB_TAB: 'sub_tab',
  ACTIVE_SUB_TAB: '',
  ACTIVE_TAB: 'Dashboard',

  setActiveTab(tab: string, type: string) {
    if (this.TAB === type) return (this.ACTIVE_TAB = tab);

    return (this.ACTIVE_SUB_TAB = tab);
  },

  isActive(tab: string, type: string) {
    if (this.TAB === type) return this.ACTIVE_TAB === tab;

    return this.ACTIVE_SUB_TAB === tab;
  },
};

const redirectTo = (route: string = '/') => history.push(route);

const generateIdFromName = (name: String) => name.split(' ').join('-');

const handleRoute = (route: string = '', tabId: string, type: string) => {
  if (route) redirectTo(route);
  sidebarMenu.setActiveTab(tabId, type);
};

const Tab = ({ name, icon, route, children }: TabProps) => {
  const tabId = generateIdFromName(name);

  return (
    <div className="tab">
      <input
        id={tabId}
        type="radio"
        name="main-menu"
        className="tab-input"
        checked={sidebarMenu.isActive(tabId, sidebarMenu.TAB)}
        onChange={() => handleRoute(route, tabId, sidebarMenu.TAB)}
      />
      <label className="tab-label" htmlFor={tabId}>
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
};

const SubTab = ({ name, icon = 'ios-arrow-forward', route }: TabProps) => {
  const subTabId = generateIdFromName(name);

  return (
    <div className="sub-tab">
      <input
        type="radio"
        id={subTabId}
        name="sub-menu"
        className="sub-tab-input"
        checked={sidebarMenu.isActive(subTabId, sidebarMenu.SUB_TAB)}
        onChange={() => handleRoute(route, subTabId, sidebarMenu.SUB_TAB)}
      />
      <label className="sub-tab-label" htmlFor={subTabId}>
        <span className="p pt-0 pl-3 small shake">
          <i className={`icon ion-${icon} p mr-3 m-0 d-inline-block`} />
          {name}
        </span>
      </label>
    </div>
  );
};

const PrivateSidebar = () => {
  return (
    <section className="col-md-3">
      <div className="col-md-12 ml-2 p-0 pt-3 pb-3 rounded-5 bg-blue text-white sidebar p-sticky">
        <div className="tabs">
          <Tab name="Dashboard" icon="ios-home" route={ROUTE.DASHBOARD} />
          <Tab name="Quiz" icon="ios-help-circle" route="/">
            <SubTab name="Seasons" route={ROUTE.QUIZ_SEASON} />
            <SubTab name="Questions" route={ROUTE.QUIZ_QUESTION} />
          </Tab>
          <Tab name="Members" icon="md-contacts" route={ROUTE.DASHBOARD} />
          <Tab name="Settings" icon="md-construct" route={ROUTE.DASHBOARD} />
        </div>
      </div>
    </section>
  );
};

export default PrivateSidebar;

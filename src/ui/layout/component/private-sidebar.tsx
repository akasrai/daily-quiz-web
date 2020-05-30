import React, { ReactNode, useContext } from 'react';

interface SidebarProps {
  children?: ReactNode;
}

const PrivateSidebar = ({ children }: SidebarProps) => {
  return (
    <section className="col-md-3">
      <div className="col-md-12 ml-2 p-0 pt-3 pb-3 rounded-5 bg-blue text-white h-100 p-sticky">
        <div className="tabs">
          <div className="tab">
            <input type="radio" id="dashboard" name="main-menu" />
            <label className="tab-label" htmlFor="dashboard">
              <span className="bold p pt-0">
                <i className="icon ion-ios-home p mr-3 m-0" />
                Dashboard
              </span>
            </label>
          </div>

          <div className="tab">
            <input type="radio" id="quiz" name="main-menu" />
            <label className="tab-label" htmlFor="quiz">
              <span className="bold p pt-0">
                <i className="icon ion-ios-help-circle-outline p mr-3 m-0" />
                Quiz
              </span>
              <i className="icon ion-ios-arrow-forward ml-2 arrow" />
            </label>
            <div className="tab-content">
              <div className="sub-tab">
                <input type="radio" id="quiz-season" name="sub-menu" />
                <label className="sub-tab-label" htmlFor="quiz-season">
                  <span className="bold p pt-0 pl-3 small">
                    <i className="icon ion-ios-arrow-forward p mr-3 m-0" />
                    Seasons
                  </span>
                </label>
              </div>

              <div className="sub-tab">
                <input type="radio" id="quiz-question" name="sub-menu" />
                <label className="sub-tab-label" htmlFor="quiz-question">
                  <span className="bold p pt-0 pl-3 small">
                    <i className="icon ion-ios-arrow-forward p mr-3 m-0" />
                    Question
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="tab">
            <input type="radio" id="members" name="main-menu" />
            <label className="tab-label" htmlFor="members">
              <span className="bold p pt-0">
                <i className="icon ion-md-contacts p mr-3 m-0" />
                Members
              </span>
            </label>
          </div>

          <div className="tab">
            <input type="radio" id="settings" name="main-menu" />
            <label className="tab-label" htmlFor="settings">
              <span className="bold p pt-0">
                <i className="icon ion-md-construct p mr-3 m-0" />
                Settings
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateSidebar;

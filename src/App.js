import React from 'react';
import { Route } from 'react-router-dom';

import Sidebar from 'components/Sidebar';

import * as ROUTES from 'constants/routes';

// import { listenToAuthChanges } from 'actions';

export const App = ({ store }) => {
  // store.dispatch(listenToAuthChanges());
  console.log(store.getState());

  return (
    <div className="layout-wrapper">
      <div className="layout-grid">
        <div className="layout-grid-sidebar">
          <Sidebar />
        </div>

        <div className="layout-grid-content">
          {
            Object.values(ROUTES)
              .map((route, index) => {
                return (
                  <Route
                    key={index}
                    exact={route.exact}
                    path={route.route}
                    component={route.container}
                  />
                )
              })
          }
        </div>
      </div>
    </div>
  )
}

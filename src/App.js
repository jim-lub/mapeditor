import React from 'react';

import ProtectedRoute from 'hoc/ProtectedRoute';
import Sidebar from 'components/Sidebar';

import * as ROUTES from 'constants/routes';

import { listenToAuthChanges } from 'actions/auth';

export const App = ({ store }) => {
  store.dispatch(listenToAuthChanges());
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
                  <ProtectedRoute
                    key={index}
                    exact={route.exact}
                    path={route.route}
                    rules={route.authorization_rules}
                    redirect={route.authorization_redirect}
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

import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import routes from 'constants/routes';

import { authOperations } from 'state/ducks/auth';

export const App = ({ store }) => {
  store.dispatch( authOperations.listenToAuthChanges() );

  return (
    <div>
      {
        routes.map((route, index) =>
          <Route key={index} exact={route.exact} path={route.path} component={route.component}/>
        )
      }
    </div>
  )
}

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { Sidebar } from 'views/components'
import { PageNotFound } from 'views/pages/404';

import routes from 'constants/routes';
import styles from './app.module.css';

import { listenToAuthChanges } from 'state/ducks/auth';

export const App = ({ store }) => {
  store.dispatch( listenToAuthChanges() );

  return (
    <div className={styles.windowWrapper}>
      <div className={styles.sidebarWrapper}>
        <Sidebar></Sidebar>
      </div>

      <div className={styles.contentWrapper}>
        <Switch>
        {
          routes.map((route, index) =>
            <Route key={index} exact={route.exact} path={route.path} component={route.component}/>
          )
        }
        <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  )
}

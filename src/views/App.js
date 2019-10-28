import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import { Navbar } from 'views/components/Navbar'
import { PageNotFound } from 'views/pages/404';

import routes from 'lib/routes';
import styles from './app.module.css';
import withAuthorization from 'views/lib/authorization/withAuthorization';
import { listenToAuthChanges } from 'state/ducks/auth';

export const App = ({ store }) => {
  store.dispatch( listenToAuthChanges() );

  return (
    <div className={styles.windowWrapper}>
      <div className={styles.navbarWrapper}>
        <Navbar />
      </div>

      <div className={styles.contentWrapper}>
        <Switch>
          {
            routes.map((route, index) =>
              <Route key={index} exact={route.exact} path={route.path} component={withAuthorization(route.component, route.ruleset, route.redirectTo)}/>
            )
          }
          <Route component={PageNotFound} />
        </Switch>
      </div>

      <ReactTooltip id="global-tooltip-handler"/>
    </div>
  )
}

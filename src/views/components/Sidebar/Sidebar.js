import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { nav } from 'constants/routes';

import { UserPanel } from './components/UserPanel';

import styles from './sidebar.module.css';

export default () => {
  return (
    <div className={styles.container}>
      <div className={styles.navLinksWrapper}>
        {
          nav.map((link, index) => {
            return (
              <Fragment key={index}>
                <NavLink
                  exact={link.route.exact}
                  to={link.route.path}
                  className={styles.link}
                  activeClassName={styles.linkActive}
                >
                  {link.name}
                </NavLink><br />
              </Fragment>
            )
          })
        }
      </div>
      <div className={styles.userPanelWrapper}>
        <UserPanel />
      </div>
    </div>
  )
}

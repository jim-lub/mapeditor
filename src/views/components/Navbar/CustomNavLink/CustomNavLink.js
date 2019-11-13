import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../navbar.module.css';

export default ({ name, icon: IconComponent, exact, path }) => {
  return (
    <div className={"clearfix " + styles.navLinkWrapper}>
      <NavLink
        exact={exact}
        to={path}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
      >
        <div className={styles.navLinkIconWrapper}><IconComponent className={styles.navLinkIcon} /></div>
        <div className={styles.navLinkTextWrapper}>{ name }</div>
      </NavLink>

    </div>
  );
}

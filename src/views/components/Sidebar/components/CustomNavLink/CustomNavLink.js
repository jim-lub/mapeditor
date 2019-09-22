import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../../sidebar.module.css';

export default ({ name, icon: IconComponent, exact, path }) => {
  return (
    <div className={styles.navLinkWrapper} data-tip={name} data-for="sidebar-tooltip-handler">
      <NavLink
        exact={exact}
        to={path}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
      >
        <IconComponent className={styles.navLinkIcon} />
      </NavLink>

    </div>
  );
}

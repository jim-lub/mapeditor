import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../../sidebar.module.css';

export default ({ name, icon: IconComponent, exact, path }) => {
  return (
    <div className={styles.navLinkWrapper}>
      <NavLink
        exact={exact}
        to={path}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
      >
        <IconComponent className={styles.navLinkIcon}/>
        <div className={styles.tooltip}>{ name }</div>
      </NavLink>

    </div>
  );
}

import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { concatClassNames } from 'lib/utils';

import getIcon from './svgicons';
import styles from './navbutton.module.css';

const NavButton = ({ location, exact, route, name, icon }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = getIcon(name);
  const isActiveRoute = (location.pathname === route);

  const classNames = concatClassNames([
    styles.button,
    (hovered) ? styles.hover : "",
    (isActiveRoute) ? styles.active : ""
  ]);

  const toggleHover = () => {
    setHovered(!hovered);
  }

  return (
    <Link to={route} className={styles.link}>
      <Icon
        className={classNames}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      />
    </Link>
  )
}

export default withRouter(NavButton);

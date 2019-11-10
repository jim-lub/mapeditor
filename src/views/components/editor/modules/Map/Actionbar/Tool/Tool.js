import React from 'react';

import { concatClassNames } from 'lib/utils';

import styles from '../actionbar.module.css';

export default ({ toolType, name, description, icon: Icon, currentTool, disabled, onClick }) => {
  const handleClick = () => onClick({ toolType });

  const buttonClassNames = concatClassNames([
    styles.toolContainer,
    (toolType === currentTool) ? styles.active : null
  ]);

  return (
    <button
      className={buttonClassNames}
      onClick={handleClick}
      disabled={disabled}
      data-tip={`${name}`}
      data-for="actionbar-tooltip-handler"
    >
      <Icon className={styles.icon} />
    </button>
  )
}

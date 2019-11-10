import React from 'react';

import styles from '../actionbar.module.css';

export default ({ name, description, icon: Icon, disabled, onClick }) => {
  const handleClick = () => onClick();

  return (
    <button
      className={styles.actionContainer}
      onClick={handleClick}
      disabled={disabled}
      data-tip={`${name}`}
      data-for="actionbar-tooltip-handler"
    >
      <Icon className={styles.icon} />
    </button>
  )
}

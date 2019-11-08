import React from 'react';

import styles from '../actionbar.module.css';

export default ({ icon: Icon, action, disabled }) => {
  const handleClick = () => {
    action();
  }

  return (
    <button className={styles.itemWrapper} onClick={handleClick} disabled={disabled}>
      <Icon className={styles.itemIcon}/>
    </button>
  );
}

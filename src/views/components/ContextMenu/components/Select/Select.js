import React from 'react';

import styles from '../../contextmenu.module.css';

export default ({ name, height, onClick }) => {
  return (
    <div
      height={height}
      className={styles.selectContainer}
      onClick={onClick}
    >
      { name }
    </div>
  );
}

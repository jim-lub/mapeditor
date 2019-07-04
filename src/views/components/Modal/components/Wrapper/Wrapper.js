import React from 'react';

import styles from './wrapper.module.css';

export default ({ width = "auto", height = "auto", children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bodyOverlay} />

      <div className={styles.modalWrapper}>
        <div
          style={{ width: width, height: height }}
          className={styles.modalContainer}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

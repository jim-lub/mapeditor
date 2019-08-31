import React from 'react';

import styles from './simple.module.css';

export default ({ width = 34, height = 34 }) => {
  return (
    <div className={styles.loading} style={{ width, height }}></div>
  );
}

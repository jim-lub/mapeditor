import React from 'react';

import styles from './default-header.module.css';

export default ({ name }) => {
  return (
    <div className={styles.wrapper}>
      <h2>{ name }</h2>
    </div>
  );
}

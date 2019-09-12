import React from 'react';

import {
  Map,
  Properties
} from 'views/components/editor/workspace';

import styles from './workspace.module.css';

export default () => {
  return (
      <div className={styles.grid}>
        <div className={styles.header}></div>
        <div className={styles.toolbar}></div>
        <div className={styles.widgets}>
          <Properties />
        </div>
        <div className={styles.map}>
          <Map />
        </div>
        <div className={styles.tileStampSelector}></div>
      </div>
  )
}
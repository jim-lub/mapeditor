import React from 'react';

import { ReactComponent as HistoryIcon } from 'assets/static/icons/other/history-blue.svg';
import styles from './notification.module.css';

export default ({ width, height }) => {

  return (
    <>
      <div className={styles.container} style={{width, height}}>
        <div className={styles.iconWrapper}>
          <HistoryIcon className={styles.icon}/>
        </div>

        <h3 className="bold">History</h3>
        <h4>Temporarily disabled</h4><br />
      </div>
    </>
  )
}

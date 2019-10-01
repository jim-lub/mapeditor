import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Scrollbars } from 'react-custom-scrollbars';

import styles from './workspacemodulewrapper.module.css';

export default ({ moduleName, children, flexGrow = 1, minHeight = 0, maxHeight = "auto"}) => {
  return (
    <div className={styles.moduleWrapperOuter} style={{flexGrow, minHeight, maxHeight}}>
      <div className={styles.moduleWrapperInner}>
        <div className={styles.moduleHeader}>
          { moduleName }
        </div>
        <div className={styles.moduleContent}>
          { children }
        </div>
      </div>
    </div>
  )
}

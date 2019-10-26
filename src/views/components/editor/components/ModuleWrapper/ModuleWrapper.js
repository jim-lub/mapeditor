import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

import styles from './modulewrapper.module.css';

export default ({ key, name = '', Icon, children }) => {
  return (
    <div className={styles.wrapperOuter}>
      <div className={styles.wrapperInner}>
        <div className={"moduleDragHandle " + styles.header}>
          { name }
        </div>

        <div className={styles.content}>
          {
            <AutoSizer>
              {({ width: contentWidth, height: contentHeight }) => {
                return React.cloneElement(children, { contentWidth, contentHeight })
              }}
            </AutoSizer>
          }
        </div>
      </div>
    </div>
  )
}

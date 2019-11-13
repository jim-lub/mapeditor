import React from 'react';

import { Simple as SimpleLoader } from '../Simple';

import styles from './overlay.module.css';

export default ({ width = 0, height = 0, scale = 5 }) => {
  return (
    <div className={styles.overlay}>
      <div
        style={{
          marginLeft: (width / 2 - ((width / scale) / 2)),
          marginTop: (height / 2 - ((height / scale) / 2))
        }}
      >
        { (width > 0) && (height > 0) && <SimpleLoader width={width / scale} height={height / scale}/> }
      </div>
    </div>
  )
}

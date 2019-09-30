import React from 'react';

import {
  Map,
  Properties,
  Toolbar,
  Menubar,
  ColorPicker,
  Layers
} from 'views/components/editor/workspace';

import styles from './workspace.module.css';

export default () => {
  return (
      <div className={styles.grid}>
        <div className={styles.header}>
          <Menubar />
        </div>
        <div className={styles.toolbar}>
          <Toolbar />
        </div>
        <div className={styles.modules}>
          <ColorPicker />
          <Layers />
          <Properties />
        </div>
        <div className={styles.map}>
          <Map />
        </div>
        <div className={styles.tileStampSelector}></div>
      </div>
  )
}

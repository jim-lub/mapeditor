import React from 'react';

import { ReactComponent as SelectionIcon } from 'assets/static/icons/other/selection-blue.svg';
import styles from './notilesetlayernotification.module.css';

export default ({ width, height }) => {

  return (
    <>
      <div className={styles.container} style={{width, height}}>
        <div className={styles.iconWrapper}>
          <SelectionIcon className={styles.icon}/>
        </div>

        <h3 className="bold">Tile Selector</h3>
        <h4>Selection is only available on tileset layers</h4><br />
      </div>
    </>
  )
}

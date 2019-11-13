import React from 'react';

import { ReactComponent as SelectionIcon } from 'assets/static/icons/other/color-palette-blue.svg';
import styles from './nocolorlayernotification.module.css';

export default ({ width, height }) => {

  return (
    <>
      <div className={styles.container} style={{width, height}}>
        <div className={styles.iconWrapper}>
          <SelectionIcon className={styles.icon}/>
        </div>

        <h3 className="bold">Color Picker</h3>
        <h4>Color picker is only available on color layers</h4><br />
      </div>
    </>
  )
}

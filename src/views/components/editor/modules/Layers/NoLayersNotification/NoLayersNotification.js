import React from 'react';

import { ReactComponent as LayersIcon } from 'assets/static/icons/other/layers-blue.svg';

import styles from './nolayersnotification.module.css';

export default ({ width, height }) => {

  return (
    <>
      <div className={styles.container} style={{width, height}}>
        <div className={styles.iconWrapper}>
          <LayersIcon className={styles.icon}/>
        </div>

        <h3 className="bold">No layers found..</h3>
        <h4>Let's create your first layer!</h4><br />

        <button
          className={"blue " + styles.button}
          disabled={true}
        >
          Create
        </button>
      </div>
    </>
  )
}

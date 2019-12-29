import React from 'react';

import { ReactComponent as LayersIcon } from 'assets/static/icons/mood/blue/happy.svg';

import styles from './notification.module.css';

export default ({ width, height }) => {
  return (
    <>
      <div className={styles.container} style={{width, height}}>
        <div className={styles.iconWrapper}>
          <LayersIcon className={styles.icon}/>
        </div>

        <h3 className="bold">Get started</h3>
        <h4>A brand new map.. how exciting!</h4>

        <h5>Before we can start painting we need to create a new layer.</h5><br />

        <button
          className={"blue " + styles.button}
          disabled={true}
        >
          Create a layer
        </button>
      </div>
    </>
  )
}

import React from 'react';
import { ProjectBar, SceneBar } from 'views/components/editor/projectmanager'

import styles from './projectmanager.module.css';

export default () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.projectBarWrapper}><ProjectBar /></div>
      <div className={styles.sceneBarWrapper}><SceneBar /></div>
    </div>
  )
}

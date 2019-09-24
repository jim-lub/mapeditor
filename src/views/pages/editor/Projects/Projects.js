import React from 'react';

import {
  ProjectSelector,
  SceneSelector,
  SceneOverview
} from 'views/components/editor/projectManagement';

import styles from './projects.module.css';

export default () => {

  return (
    <>
      <div className={styles.grid}>

        <div className={styles.projectSelector}>
          <ProjectSelector />
        </div>

        <div className={styles.sceneSelector}>
          <SceneSelector />
        </div>

        <div style={{padding: 50}}>
          <SceneOverview />
        </div>

      </div>
    </>
  );
}

import React from 'react';

import { ProjectSelector } from 'views/components/editor/projectManagement';
import { SceneSelector } from 'views/components/editor/projectManagement';

import { ManageProjectSettings } from 'views/components/editor/projectManagement/ManageProjectSettings';

import FirestoreOptions from 'views/components/_dev/firestore/FirestoreOptions';

import styles from './projects.module.css';

export default () => {
  return (
    <div className={styles.grid}>

      <div className={styles.projectSelector}>
        <ProjectSelector />
      </div>

      <div className={styles.sceneSelector}>
        <SceneSelector />
      </div>

      <div>
        <ManageProjectSettings />
      </div>

    </div>
  );
}

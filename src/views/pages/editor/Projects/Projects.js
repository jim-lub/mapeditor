import React from 'react';

import { ProjectSelector } from 'views/components/editor/projectManagement';
import { SceneSelector } from 'views/components/editor/projectManagement';
import { LinkButton } from 'views/components/LinkButton';

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
          <LinkButton to="/editor/workspace" className="blue">Open</LinkButton>
        </div>

      </div>
    </>
  );
}

import React from 'react';

import { ProjectSelector } from 'views/components/editor/projectManagement';
import { SceneSelector } from 'views/components/editor/projectManagement';

import { ManageProjectSettings } from 'views/components/editor/projectManagement/ManageProjectSettings';

import { useModal } from 'lib/modal';
import {
  CreateProjectModal,
  CreateSceneModal
} from 'views/components/editor/projectManagement/Modals';

import styles from './projects.module.css';

export default () => {
  const [CreateProjectModalComponent, openCreateProjectModal] = useModal(CreateProjectModal, {});
  const [CreateSceneModalComponent, openCreateSceneModal] = useModal(CreateSceneModal, {});

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
          <button onClick={openCreateProjectModal}>Create Project</button><br /><br />
          <button onClick={openCreateSceneModal}>Create Scene</button><br /><br />
          <ManageProjectSettings />
        </div>

      </div>

      <CreateProjectModalComponent />
      <CreateSceneModalComponent />
    </>
  );
}

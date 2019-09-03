import React from 'react';

import { ProjectSelector } from 'views/components/editor/projectManagement';
import { SceneSelector } from 'views/components/editor/projectManagement';

import { ManageProjectSettings } from 'views/components/editor/projectManagement/ManageProjectSettings';

import { useModal } from 'lib/hooks';
import {
  CreateProjectModal,
  DeleteProjectModal,

  CreateSceneModal,
  DeleteSceneModal
} from 'views/components/editor/projectManagement/Modals';

import styles from './projects.module.css';

export default () => {
  const [CreateProjectModalComponent, openCreateProjectModal] = useModal(CreateProjectModal);
  const [DeleteProjectModalComponent, openDeleteProjectModal] = useModal(DeleteProjectModal, { width: 400 });
  const [DeleteSceneModalComponent, openDeleteSceneModal] = useModal(DeleteSceneModal, { width: 400 });


  const [CreateSceneModalComponent, openCreateSceneModal] = useModal(CreateSceneModal);

  return (
    <>
      <div className={styles.grid}>

        <div className={styles.projectSelector}>
          <ProjectSelector onDelete={openDeleteProjectModal}/>
        </div>

        <div className={styles.sceneSelector}>
          <SceneSelector onDelete={openDeleteSceneModal}/>
        </div>

        <div style={{padding: 50}}>
          <button onClick={() => openCreateProjectModal()}>Create Project</button><br /><br />

          <button onClick={() => openCreateSceneModal({ testId: 1 })}>Create Scene 1</button><br /><br />
          <button onClick={() => openCreateSceneModal({ testId: 2 })}>Create Scene 2</button><br /><br />
          <ManageProjectSettings />
        </div>

      </div>

      <CreateProjectModalComponent />
      <DeleteProjectModalComponent />

      <CreateSceneModalComponent />
      <DeleteSceneModalComponent />
    </>
  );
}

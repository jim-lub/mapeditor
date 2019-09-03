import React from 'react';

import { ProjectSelector } from 'views/components/editor/projectManagement';
import { SceneSelector } from 'views/components/editor/projectManagement';

import { useModal } from 'lib/hooks';
import {
  CreateProjectModal,
  DeleteProjectModal,
  UpdateProjectModal,

  CreateSceneModal,
  DeleteSceneModal,
  UpdateSceneModal
} from 'views/components/editor/projectManagement/Modals';

import styles from './projects.module.css';

export default () => {
  const [CreateProjectModalComponent, openCreateProjectModal] = useModal(CreateProjectModal);
  const [DeleteProjectModalComponent, openDeleteProjectModal] = useModal(DeleteProjectModal, { width: 400 });
  const [UpdateProjectModalComponent, openUpdateProjectModal] = useModal(UpdateProjectModal);

  const [CreateSceneModalComponent, openCreateSceneModal] = useModal(CreateSceneModal);
  const [DeleteSceneModalComponent, openDeleteSceneModal] = useModal(DeleteSceneModal, { width: 400 });
  const [UpdateSceneModalComponent, openUpdateSceneModal] = useModal(UpdateSceneModal);



  return (
    <>
      <div className={styles.grid}>

        <div className={styles.projectSelector}>
          <ProjectSelector onUpdate={openUpdateProjectModal} onDelete={openDeleteProjectModal}/>
        </div>

        <div className={styles.sceneSelector}>
          <SceneSelector onUpdate={openUpdateSceneModal} onDelete={openDeleteSceneModal}/>
        </div>

        <div style={{padding: 50}}>
          <button onClick={() => openCreateProjectModal()}>Create Project</button><br /><br />

          <button onClick={() => openCreateSceneModal({ testId: 1 })}>Create Scene 1</button><br /><br />
          <button onClick={() => openCreateSceneModal({ testId: 2 })}>Create Scene 2</button><br /><br />
        </div>

      </div>

      <CreateProjectModalComponent />
      <DeleteProjectModalComponent />
      <UpdateProjectModalComponent />

      <CreateSceneModalComponent />
      <DeleteSceneModalComponent />
      <UpdateSceneModalComponent />
    </>
  );
}

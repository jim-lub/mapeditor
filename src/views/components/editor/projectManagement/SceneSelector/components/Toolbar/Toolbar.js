import React from 'react';

import { useModal } from 'lib/hooks';
import {
  CreateProjectModal,
  CreateSceneModal
} from 'views/components/editor/projectManagement/Modals';

import styles from './toolbar.module.css';

export default ({ onCreateScene, disabled }) => {
  const [CreateSceneModalComponent, openCreateSceneModal] = useModal(CreateSceneModal, {});

  return (
    <>
      <div className={"clearfix " + styles.container}>
        <button onClick={openCreateSceneModal}>Create Scene</button>
      </div>
      <CreateSceneModalComponent />
    </>
  );
};

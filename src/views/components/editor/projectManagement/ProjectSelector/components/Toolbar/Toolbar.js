import React from 'react';

import { useModal } from 'lib/hooks';
import {
  CreateProjectModal,
} from 'views/components/editor/projectManagement/Modals';

import styles from './toolbar.module.css';

export default () => {
  const [CreateProjectModalComponent, openCreateProjectModal] = useModal(CreateProjectModal, {});

  return (
    <>
      <div className={"clearfix " + styles.container}>
        <button onClick={openCreateProjectModal}>Create Project</button>
      </div>
      <CreateProjectModalComponent />
    </>
  );
};

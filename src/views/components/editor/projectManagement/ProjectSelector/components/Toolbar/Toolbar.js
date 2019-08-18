import React from 'react';

import { useModal } from 'lib/modal';
import { CreateProjectModalTemplate } from '../../modals';

import styles from './toolbar.module.css';

export default ({ userId, onCreateProject }) => {
  const [CreateProjectModal, openModal_createProject] = useModal(
    CreateProjectModalTemplate,
    { userId, onCreateProject }
  );

  return (
    <>
      <div className={"clearfix " + styles.container}>
        <button className={styles.button} onClick={openModal_createProject}>+ Create Project</button>
      </div>
      <CreateProjectModal />
    </>
  );
};
import React from 'react';

import { useModal } from 'lib/modal';
import { concatClassNames } from 'lib/utils';

import { DeleteProjectModalTemplate } from '../../modals';

import styles from './projectnode.module.css';

export default ({ name, description, projectId, userId, isActive, onSelect, onDelete }) => {
  const [DeleteProjectModal, openModal_deleteProject] = useModal(
    DeleteProjectModalTemplate,
    { projectId, userId, projectName: name, onDelete }
  );

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({ projectId });
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
    openModal_deleteProject();
  };

  const fetchChildScenes = Math.floor(Math.random() * 10);

  const projectNodeClassName = concatClassNames([
    styles.container,
    (isActive) ? styles.active : null
  ]);

  return (
    <>
      <div className={projectNodeClassName} onClick={handleSelect}>
        <div className={styles.nameContainer}>
          { name || "null" }
        </div>

        <div className={styles.descriptionContainer}>
          { description || "..."}
        </div>

        <div className={"clearfix " + styles.tagsContainer}>
          <div className={styles.tag}><span style={{fontWeight: "bold"}}>{ fetchChildScenes }</span> Scene(s)</div>
          <span className={styles.deleteButton} onClick={openDeleteModal}>Delete</span>
        </div>

        <div className={styles.toolbarContainer}>
        </div>
      </div>

      <DeleteProjectModal />
    </>
  );
};

import React from 'react';

import { useModal } from 'lib/hooks';
import { concatClassNames } from 'lib/utils';

import { DeleteProjectModalTemplate } from '../../modals';

import styles from './projectnode.module.css';

export default ({ name, description, projectId, isActive, childScenes, onSelect, onDelete, onUpdate }) => {

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({ projectId });
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
    onDelete({ projectId })
  };

  const openUpdateModal = (e) => {
    e.stopPropagation();
    onUpdate({ projectId })
  };

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
          { projectId || "..."}
        </div>

        <div className={"clearfix " + styles.tagsContainer}>
          <div className={styles.tag}><span style={{fontWeight: "bold"}}>{ childScenes.length }</span> Scene(s)</div>
          <span className={styles.deleteButton} onClick={openDeleteModal}>Delete</span>
          <span className={styles.updateButton} onClick={openUpdateModal}>Edit</span>
        </div>

        <div className={styles.toolbarContainer}>
        </div>
      </div>
    </>
  );
};

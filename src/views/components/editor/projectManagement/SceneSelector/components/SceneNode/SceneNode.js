import React from 'react';

import { useModal } from 'lib/hooks';
import { concatClassNames } from 'lib/utils';

import styles from './scenenode.module.css';

export default ({ name, description, sceneId, isActive, onSelect, onDelete, onUpdate }) => {
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({ sceneId });
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
    onDelete({ sceneId });
  };

  const openUpdateModal = (e) => {
    e.stopPropagation();
    onUpdate({ sceneId });
  }

  const sceneNodeClassName = concatClassNames([
    styles.container,
    (isActive) ? styles.active : null
  ]);

  return (
    <>
      <div className={sceneNodeClassName} onClick={handleSelect}>
        <div className={styles.nameContainer}>
          { name || "null" }
        </div>

        <div className={styles.descriptionContainer}>
          { description || "..."}
        </div>

        <div className={"clearfix " + styles.tagsContainer}>
          <span className={styles.deleteButton} onClick={openDeleteModal}>Delete</span>
          <span className={styles.updateButton} onClick={openUpdateModal}>Edit</span>
        </div>

        <div className={styles.toolbarContainer}>
        </div>
      </div>
    </>
  );
};

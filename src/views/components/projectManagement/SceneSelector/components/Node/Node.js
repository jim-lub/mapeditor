import React from 'react';

import { concatClassNames } from 'lib/utils';
import styles from './node.module.css';

export default ({ sceneId, name, description, isActive, onSelect, openDeleteModal, openUpdateModal }) => {
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({ sceneId });
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    openDeleteModal({ sceneId });
  }

  const handleUpdate = (e) => {
    e.stopPropagation();
    openUpdateModal({ sceneId });
  }

  const nodeClassName = concatClassNames([
    styles.container,
    (isActive) ? styles.active : null
  ]);

  return (
    <div className={nodeClassName} onClick={handleSelect}>
      <div className={styles.name}>{ name }</div>
      <div className={styles.description}>{ description || "..." }</div>

      <div className={styles.buttonContainer}>
        <span className={styles.updateButton} onClick={handleUpdate}>Edit</span>
        <span className={styles.deleteButton} onClick={handleDelete}>Delete</span>
      </div>
    </div>
  );
}

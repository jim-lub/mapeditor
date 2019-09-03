import React from 'react';

import { concatClassNames } from 'lib/utils';
import styles from './node.module.css';

export default ({ projectId, name, description, isActive, childScenes, onSelect, openDeleteModal, openUpdateModal }) => {
  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({ projectId });
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    openDeleteModal({ projectId });
  }

  const handleUpdate = (e) => {
    e.stopPropagation();
    openUpdateModal({ projectId });
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
        <span className={styles.tag + " " + styles.bold}>{ childScenes }</span>
        <span className={styles.updateButton} onClick={handleUpdate}>Edit</span>
        <span className={styles.deleteButton} onClick={handleDelete}>Delete</span>
      </div>
    </div>
  );
}

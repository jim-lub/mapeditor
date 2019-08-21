import React from 'react';

import { useModal } from 'lib/modal';
import { concatClassNames } from 'lib/utils';

import { DeleteSceneModalTemplate } from '../../modals';

import styles from './scenenode.module.css';

export default ({ name, description, sceneId, isActive, onSelect, onDelete }) => {
  const [DeleteSceneModal, openModal_deleteScene] = useModal(
    DeleteSceneModalTemplate,
    { sceneId, sceneName: name, onDelete, width: 400 }
  );

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({ sceneId });
  };

  const openDeleteModal = (e) => {
    e.stopPropagation();
    openModal_deleteScene();
  };

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
        </div>

        <div className={styles.toolbarContainer}>
        </div>
      </div>

      <DeleteSceneModal />
    </>
  );
};

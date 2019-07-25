import React, { useState } from 'react';

import styles from './scenenode.module.css';

import { DeleteSceneModal } from '../DeleteSceneModal';
import { useModal } from 'views/lib/hooks/useModal';

export default ({ userId, projectId, sceneId, name, description, deleteAction, onSelect, isActive }) => {
  const [openModal_deleteScene, DeleteModalComponent] = useModal({
    type: 'DELETE',
    modalWidth: 500,
    onSubmitAction: () => deleteAction({ userId, projectId, sceneId }),
    Component: DeleteSceneModal,
    componentProps: {
      name
    }
  });

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({
      sceneId
    })
  }

  return (
    <>
      {/* OPEN MODAL BUTTON*/}
      <div className={styles.container} style={(isActive) ? {backgroundColor: "#e4f5f7"} : null} onClick={handleSelect}>
        <div className={styles.titlebar}>{ name || "null" }</div>
        <div className={styles.descriptionbar}>{ description || "null" }</div>
        <div className={styles.optionbar}>
          <span onClick={(e) => { e.stopPropagation(); openModal_deleteScene()}} className={styles.deleteButton}>delete</span>&nbsp;
        </div>
      </div>

      {/* MODAL */}
      <DeleteModalComponent />
    </>
  )
}

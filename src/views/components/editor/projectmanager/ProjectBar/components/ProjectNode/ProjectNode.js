import React, { useState } from 'react';

import styles from './projectnode.module.css';

import { DeleteProjectModal } from '../DeleteProjectModal';
import { useModal } from 'views/lib/hooks/useModal';

export default ({ projectId, userId, name, description, deleteAction, onSelect, isActive }) => {
  const [openModal_deleteProject, DeleteModalComponent] = useModal({
    type: 'DELETE',
    modalWidth: 500,
    onSubmitAction: () => deleteAction({ userId, projectId }),
    Component: DeleteProjectModal,
    componentProps: {
      name,
      childScenes: [1, 0]
    }
  });

  const handleSelect = (e) => {
    e.stopPropagation();
    onSelect({
      projectId
    })
  }

  return (
    <>
      {/* OPEN MODAL BUTTON*/}
      <div className={styles.container} style={(isActive) ? {backgroundColor: "#e4f5f7"} : null} onClick={handleSelect}>
        <div className={styles.titlebar}>{ name || "null" }</div>
        <div className={styles.descriptionbar}>{ description || "null" }</div>
        <div className={styles.optionbar}>
          <span onClick={(e) => { e.stopPropagation(); openModal_deleteProject()}} className={styles.deleteButton}>delete</span>&nbsp;
        </div>
      </div>

      {/* MODAL */}
      <DeleteModalComponent />
    </>
  )
}
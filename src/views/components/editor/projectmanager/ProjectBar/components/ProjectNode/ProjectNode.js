import React, { useState } from 'react';

import { Modal } from 'views/components/Modal';
import styles from './projectnode.module.css';

import { DeleteProjectModal } from '../DeleteProjectModal';
import { useModal } from 'views/lib/hooks/useModal';

export default ({ projectId, userId, name, description, deleteAction, onSelect, isActive }) => {
  const [deleteModalToggle, DeleteModalComponent] = useModal({
    type: 'confirm_delete',
    onCloseAction: () => console.log('Modal closed.'),
    onSubmitAction: () => deleteAction({ userId, projectId }),
    Component: DeleteProjectModal,
    properties: {
      name
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
      <div className={styles.container} style={(isActive) ? {backgroundColor: "blue"} : null} onClick={handleSelect}>
        <div className={styles.titlebar}>{ name || "null" }</div>
        <div className={styles.descriptionbar}>{ description || "null" }</div>
        <div className={styles.optionbar}>
          <span onClick={(e) => { e.stopPropagation(); deleteModalToggle()}} className={styles.deleteButton}>delete</span>&nbsp;
        </div>
      </div>

      {/* MODAL */}
      <DeleteModalComponent />
    </>
  )
}

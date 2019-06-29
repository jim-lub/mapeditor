import React, { useState } from 'react';

import { Modal } from 'views/components/Modal';
import styles from './projectnode.module.css';

export default ({ projectId, userId, name, description, deleteAction }) => {
  const [visiblity, setVisibility] = useState(false);

  const handleClose = () => {
      setVisibility(false);
  }

  const handleSubmit = () => {
    deleteAction({
      userId,
      projectId
    });
    
    setVisibility(false);
  }

  return (
    <>
      {/* OPEN MODAL BUTTON*/}
      <div className={styles.container}>
        <div className={styles.titlebar}>{ name || "null" }</div>
        <div className={styles.descriptionbar}>{ description || "null" }</div>
        <div className={styles.optionbar}>
          <span onClick={() => setVisibility(true)}>delete</span>
        </div>
      </div>

      {/* MODAL */}
      {
        (visiblity)
        ? <Modal
            type="confirm_delete"
            width={500}
            isVisible={true}
            onClose={handleClose}
            onSubmit={handleSubmit}
          >
            <div>Are you sure you want to delete project #{projectId}?</div>
          </Modal>
        : null
      }
    </>
  )
}

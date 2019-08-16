import React from 'react';

import { ModalComponent } from 'views/components/Modal';

import styles from './deleteprojectmodal.module.css';

export default ({ userId, projectId, projectName, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete({ userId, projectId });
    // onClose();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}><h1>Delete project</h1></div>
        <div className={styles.warning}>
          <div className={styles.message}>
            Are you sure you want to delete
            <span style={{fontWeight: "bold"}}> `{ projectName }`</span>?
            This action is irreversible!<br/>
          </div>

          <div className={styles.scenesList}>
            <span style={{fontWeight: "bold"}}>The following scene(s) will also be deleted:</span>
            <ul>
              <li>The constructor</li>
              <li>The assembler</li>
              <li>The smelter</li>
            </ul>
          </div>
        </div>
      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Delete", color: "red", action: handleDelete}}
      />
    </>
  );
};

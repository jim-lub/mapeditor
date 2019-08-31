import React from 'react';

import { ModalComponent } from 'views/components/Modal';

import styles from '../../deleteprojectmodal.module.css';

export default ({ onClose }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Delete project</h1>
        </div>

        <div className={styles.warning}>
          An error occured while trying to retrieve data for this project. Please try again.
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
      />
    </>
  )
}

import React from 'react';

import { ModalComponent } from 'views/components/Modal';
import { Loader } from 'views/components/Loader';

import styles from '../../../modal.module.css';

export default ({ requestStatus, onClose }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Delete scene</h1>
        </div>

        {
          (requestStatus === 'REQUEST')
            ? <div className={styles.loaderContainerBody}><Loader.Simple width={48} height={48}/></div>
            : <div className={styles.error}>
                An error occured while trying to retrieve data for this scene. Please try again.
              </div>
        }

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
      />
    </>
  )
}

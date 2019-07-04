import React from 'react';

import styles from './deletemodal.module.css';

export default ({ handleClose, handleSubmit, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        { children }
      </div>

      <div className={styles.buttonBox + " clearfix"}>
        <button className={styles.buttonClose} onClick={handleClose}>Cancel</button>
        <button className={styles.buttonDelete + " red"} onClick={handleSubmit}>Delete</button>
      </div>
    </div>
  );
}

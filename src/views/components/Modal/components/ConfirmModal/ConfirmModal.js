import React from 'react';

import styles from './confirmmodal.module.css';

export default ({ handleClose, handleSubmit, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        { children }
      </div>

      <div className={styles.buttonBox + " clearfix"}>
        <button className={styles.buttonClose} onClick={handleClose}>Cancel</button>
        <button className={styles.buttonConfirm + " green"} onClick={handleSubmit}>Confirm</button>
      </div>
    </div>
  );
}

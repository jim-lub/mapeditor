import React from 'react';

import styles from './confirmationmodal.module.css';

export default ({ type, children, onClose, onSubmit, width = "auto", height = "auto" }) => {
  return (
    <div
      style={{width: width, height: height}}
      className={styles.container}
    >
      <div className={styles.subcontainer}>{children}</div>

      <div className={styles.bottomcontainer}>
        <button style={{width: 100}} onClick={onClose}>Cancel</button>

        {
          (type === 'confirm')
          ? <button style={{width: 100, float: "right"}} className="green" onClick={onSubmit}>Confirm</button>
          : null
        }

        {
          (type === 'confirm_delete')
          ? <button style={{width: 100, float: "right"}} className="red" onClick={onSubmit}>Delete</button>
          : null
        }
      </div>

    </div>
  )
}

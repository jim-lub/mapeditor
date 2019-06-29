import React from 'react';

import styles from './formwrapper.module.css';

export default ({ width = "auto", height = "auto", onClose, onSubmit, onSubmitText = "Submit", children }) => {
  return (
    <div
      style={{width: width, height: height}}
      className={styles.container}
    >
      <div className={styles.subcontainer}>{children}</div>

      <div className={styles.bottomcontainer}>
        <button style={{width: 100}} onClick={onClose}>Close</button>
        <button style={{width: 100, float: "right"}} className="green" onClick={onSubmit}>{ onSubmitText }</button>
      </div>

    </div>
  )
}

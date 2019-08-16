import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

import styles from './modalwrapper.module.css';

export default ({ children, type, width = 500, height = "auto", onClose }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.wrapper}>
        <div className={styles.overlay} onClick={handleClose} />

        <div className={styles.modalWrapper}>
          <div className={styles.modal} style={{width, height}}>
            { children }
          </div>
        </div>
      </div>
    </FocusTrap>
  ,
  document.getElementById('modal-root')
  );
};

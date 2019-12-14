import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

import styles from './modal.module.css';

export default ({ children, isVisible = false, width = 500, height = 'auto', onClose }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.wrapper}>
        <div className={styles.overlay} onClick={handleClose} />

        <div className={styles.modalWrapper}>
          <div className={styles.modal} style={{width, height}}>
            { children }
          </div>
        </div>
        <button className={styles.focusTrapButton} onClick={handleClose}></button>
      </div>
    </FocusTrap>
  ,
  document.getElementById('modal-root')
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

import { Modals } from './Modals';

import styles from './modal.module.css';

export default ({ children, type, width = 500, height = "auto", onClose }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const ModalType = () => {
    switch(type) {
      case 'custom':
        return null;
      default:
        return (
          <Modals.Basic onClose={onClose}>
            { children }
          </Modals.Basic>
        );
    }
  };

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.wrapper}>
        <div className={styles.overlay} onClick={handleClose} />

        <div className={styles.modalWrapper}>
          <div className={styles.modal} style={{width, height}}>
            { <ModalType /> }
          </div>
        </div>
      </div>
    </FocusTrap>
  ,
  document.getElementById('modal-root')
  );
};

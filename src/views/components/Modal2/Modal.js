import React from 'react';
import ReactDOM from 'react-dom';

import { Modal } from './ModalWindows';

import styles from './modal.module.css';

export default ({ onClose, children }) => {
  return ReactDOM.createPortal(
    (
      <Wrapper onClose={onClose}>
        { children }
      </Wrapper>
    ),
    document.getElementById('modal-root')
  );
}

const Wrapper = ({ onClose, children }) => {

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        onClick={(e) => handleClose(e)}
      />

      <div className={styles.modalWrapper}>
        <div
          className={styles.modal}
        >
          <Modal.Simple onClose={handleClose}>{ children }</Modal.Simple>
        </div>
      </div>
    </div>
  );
}

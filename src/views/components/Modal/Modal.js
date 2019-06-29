import React from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.css';

import { FormWrapper } from './components/FormWrapper';
import { ConfirmationModal } from './components/ConfirmationModal';

const ModalBase = ({ children }) => {
  return (
    <div className={styles.windowWrapper}>
      <div className={styles.backgroundOverlay} />
      <div className={styles.modalWrapper}>{children}</div>
    </div>
  )
}

export default ({ type, children, isVisible, onClose, onSubmit, width, height }) => {
  const handleClose = () => {
    onClose();
  }

  const handleSubmit = () => {
    onSubmit();
  }

  if (type === 'form' && isVisible === true) {
    return ReactDOM.createPortal(
      <ModalBase>
          <FormWrapper onClose={handleClose} onSubmit={handleSubmit} width={width} height={height}>
          {
            React.cloneElement(children, { onClose: handleClose, onSubmit: handleSubmit })
          }
        </FormWrapper>
      </ModalBase>,
      document.getElementById('modal-root')
    );
  }

  if (type === 'confirm' && isVisible === true) {
    return ReactDOM.createPortal(
      <ModalBase>
          <ConfirmationModal type={type} onClose={handleClose} onSubmit={handleSubmit} width={width} height={height}>
          {
            React.cloneElement(children, { onClose: handleClose, onSubmit: handleSubmit })
          }
        </ConfirmationModal>
      </ModalBase>,
      document.getElementById('modal-root')
    );
  }

  if (type === 'confirm_delete' && isVisible === true) {
    return ReactDOM.createPortal(
      <ModalBase>
          <ConfirmationModal type={type} onClose={handleClose} onSubmit={handleSubmit} width={width} height={height}>
          {
            React.cloneElement(children, { onClose: handleClose, onSubmit: handleSubmit })
          }
        </ConfirmationModal>
      </ModalBase>,
      document.getElementById('modal-root')
    );
  }

  return null;
}

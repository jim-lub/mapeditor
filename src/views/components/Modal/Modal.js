import React from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  ConfirmModal,
  DeleteModal,
  SingleFormModal,
  MultiFormModal
} from './components';

const Modal = ({ modalType, onClose, onSubmit, children }) => {
  const modalMethods = {
    handleClose: () => onClose(),
    handleSubmit: () => onSubmit()
  }

  switch (modalType) {
    case 'CONFIRM':
      return (
        <ConfirmModal {...modalMethods}>
          { children }
        </ConfirmModal>
      );

    case 'DELETE':
      return (
        <DeleteModal {...modalMethods}>
          { children }
        </DeleteModal>
      );

    case 'FORM_SINGLE':
      return (
        <SingleFormModal {...modalMethods}>
          { children }
        </SingleFormModal>
      );

    case 'FORM_MULTI':
      return (
        <MultiFormModal {...modalMethods}>
          { children }
        </MultiFormModal>
      );

    default:
      return (
        <>
          { children }
        </>
      );
  }
}

export default ({ modalWidth, modalHeight, ...rest }) => {
  return ReactDOM.createPortal(
    <Wrapper width={modalWidth} height={modalHeight}>
      <Modal {...rest} />
    </Wrapper>,

    document.getElementById('modal-root')
  );
}

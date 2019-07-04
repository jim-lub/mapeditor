import React from 'react';
import ReactDOM from 'react-dom';

import {
  Wrapper,
  ConfirmModal,
  DeleteModal,
  SingleFormModal,
  MultiFormModal
} from './Components';

const Modal = ({ modalType, modalWidth, modalHeight, onClose, onSubmit, children }) => {
  const modalMethods = {
    handleClose: () => onClose(),
    handleSubmit: () => onSubmit()
  }

  switch (modalType) {
    case 'CONFIRM':
      return (
        <Wrapper>
          <ConfirmModal {...modalMethods}>
            { children }
          </ConfirmModal>
        </Wrapper>
      );

    case 'DELETE':
      return (
        <Wrapper>
          <DeleteModal {...modalMethods}>
            { children }
          </DeleteModal>
        </Wrapper>
      );

    case 'FORM_SINGLE':
      return (
        <Wrapper>
          <SingleFormModal {...modalMethods}>
            { children }
          </SingleFormModal>
        </Wrapper>
      );

    case 'FORM_MULTI':
      return (
        <Wrapper>
          <MultiFormModal {...modalMethods}>
            { children }
          </MultiFormModal>
        </Wrapper>
      );

    default:
      return (
        <Wrapper>
          { children }
        </Wrapper>
      );
  }
}

export default (props) => {
  return ReactDOM.createPortal(
    <Modal {...props} />,
    document.getElementById('modal-root')
  );
}

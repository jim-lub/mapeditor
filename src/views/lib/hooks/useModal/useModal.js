import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'views/components/Modal';

export default ({ type, onCloseAction = null, onSubmitAction = null, Component = null, properties, ...rest }) => {
  const [isVisible, setVisibility] = useState(false);

  const handleOpen = () => {
    setVisibility(true);
  }

  const handleClose = () => {
    if (onCloseAction) onCloseAction();

    setVisibility(false);
  }

  const handleSubmit = () => {
    if (onSubmitAction) onSubmitAction();

    setVisibility(false);
  }

  if (isVisible && Component) {

    return [
      handleOpen,
      () => (
        <Modal type={type} isVisible={isVisible} onClose={handleClose} onSubmit={handleSubmit}>
          <Component {...properties } />
        </Modal>
      ),
      isVisible,
    ];
  }

  return [handleOpen, Empty, isVisible]
}

const Empty = () => {
  return null;
}

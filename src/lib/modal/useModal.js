import React, { useState } from 'react';

import Modal from 'views/components/Modal';

export default (Component, props) => {
  const [isVisible, setVisibility] = useState(false);

  const handleOpen = () => setVisibility(true);
  const handleClose = () => setVisibility(false);

  if (isVisible && Component) {
    return [
      () => (
        <Modal onClose={handleClose}>
          <Component onClose={handleClose} {...props}/>
        </Modal>
      ),
      handleOpen
    ];
  }

  return [() => null, handleOpen];
};

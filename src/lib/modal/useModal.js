import React, { useState } from 'react';

import ModalWrapper from 'views/components/Modal';

export default (Component, props) => {
  const [isVisible, setVisibility] = useState(false);

  const handleOpen = () => setVisibility(true);
  const handleClose = () => setVisibility(false);

  if (isVisible && Component) {
    return [
      () => (
        <ModalWrapper onClose={handleClose}>
          <Component onClose={handleClose} {...props}/>
        </ModalWrapper>
      ),
      handleOpen
    ];
  }

  return [() => null, handleOpen];
};

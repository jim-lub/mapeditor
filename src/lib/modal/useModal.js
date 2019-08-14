import React, { useState, useEffect } from 'react';

import { Modal } from 'views/components/Modal2';

export default (Component, properties) => {
  const [isVisible, setVisibility] = useState(false);

  const handleOpen = () => setVisibility(true);
  const handleClose = () => setVisibility(false);

  useEffect(() => {
    console.log('isVisible: ', isVisible)
  }, [isVisible]);

  if (isVisible && Component) {
    return [
      () => (
        <Modal onClose={handleClose}>
          <Component {...properties}/>
        </Modal>
      ),
      handleOpen
    ];
  }

  return [() => null, handleOpen];
};

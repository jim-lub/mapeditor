import React, { useState } from 'react';

import ModalWrapper from 'views/components/Modal';

export default (Component, onHookCallProps = {}) => {
  const [isVisible, setVisibility] = useState(false);
  const [onModalOpenProps, setOnModalOpenProps] = useState({});
  const { height, width } = onHookCallProps;

  const handleOpen = (props = {}) => {
    setOnModalOpenProps(props);
    setVisibility(true);
  };
  const handleClose = () => setVisibility(false);

  if (isVisible && Component) {
    return [
      () => (
        <ModalWrapper onClose={handleClose} width={width} height={height}>
          <Component onClose={handleClose} {...onHookCallProps} {...onModalOpenProps}/>
        </ModalWrapper>
      ),
      handleOpen
    ];
  }

  return [() => null, handleOpen, handleClose];
};

import React, { forwardRef, useState } from 'react';

import { Modal } from 'views/components/Modal';

export default ({ type, modalWidth, modalHeight, onCloseAction = null, onSubmitAction = null, Component = null, ref, componentProps = {}, ...rest }) => {
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
    Component = (ref)
      ? forwardRef(Component)
      : Component

    return [
      handleOpen,
      () => (
        <Modal
          modalType={type}
          modalWidth={modalWidth}
          modalHeight={modalHeight}
          isVisible={isVisible}
          onClose={handleClose}
          onSubmit={handleSubmit}
        >
          {
            (ref)
              ? <Component {...componentProps} ref={ref} />
              : <Component {...componentProps} />
          }
        </Modal>
      ),
      isVisible,
    ];
  }

  return [handleOpen, () => null, isVisible]
}

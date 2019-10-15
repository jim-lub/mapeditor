import React, { useState } from 'react';

import { ContextMenu } from 'views/components/ContextMenu';

export default () => {
  const [isVisible, setVisibility] = useState(false);

  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  const [children, setChildren] = useState([]);
  const [props, setProps] = useState({});

  const handleOpen = (e, children = [], props = {}) => {
    e.preventDefault();
    e.stopPropagation();

    setChildren(children);
    setProps(props);

    setClientX(e.clientX);
    setClientY(e.clientY);
    setInnerWidth(e.view.innerWidth);
    setInnerHeight(e.view.innerHeight);

    setVisibility(true);
  }

  const handleClose = () => setVisibility(false);

  if (isVisible) {
    return [
      () => (
        <ContextMenu
          clientX={clientX}
          clientY={clientY}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          onClose={handleClose}

          children={children}
          props={props}
        />
      ),
      handleOpen
    ]
  }

  return [() => null, handleOpen];
}

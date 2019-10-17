import React, { useState } from 'react';

import { ContextMenu } from 'views/components/ContextMenu';

export default () => {
  const [isVisible, setVisibility] = useState(false);

  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  const [items, setItems] = useState([]);
  const [props, setProps] = useState({});

  const handleOpen = (e, items = [], props = {}) => {
    e.preventDefault();
    e.stopPropagation();

    setItems(items);
    setProps(props);

    setClientX(e.clientX);
    setClientY(e.clientY);
    setInnerWidth(e.view.innerWidth);
    setInnerHeight(e.view.innerHeight);

    setVisibility(true);
  }

  const handleClose = () => setVisibility(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (isVisible) {
    return [
      ({ width = "auto" }) => (
        <ContextMenu
          clientX={clientX}
          clientY={clientY}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          width={width}
          onContextMenu={handleContextMenu}
          onClose={handleClose}

          items={items}
          props={props}
        />
      ),
      handleOpen
    ]
  }

  return [() => null, handleOpen];
}

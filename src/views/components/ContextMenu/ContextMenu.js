import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import { Item, Separator } from './components';

import styles from './contextmenu.module.css';
import fadeTransition from 'views/css/transitions/fade.module.css';

export default ({
  clientX, clientY, innerWidth, innerHeight,
  items,
  width,
  isVisible, onClose
}) => {
  const outerElement = useRef();
  // const innerElementHeight = 28; // height of select, toggle, parent items
  const outerElementHeight = (items.length * 28);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  //eslint-disable-next-line
  }, []);

  const handleClick = (e) => (outerElement.current.contains(e.target)) ? null : handleClose();

  const handleClose = () => {
    onClose();
  }

  const calculatePosition = () => {
    const posY = ((clientY + outerElementHeight) > innerHeight)
      ? (clientY - outerElementHeight)
      : clientY;

    const posX = clientX

    return {
      left: posX,
      top: posY
    }
  }

  return ReactDOM.createPortal(
    <CSSTransition
      in={isVisible}
      timeout={500}
      classNames={fadeTransition}
      appear
    >
      <div
        ref={outerElement}
        className={styles.contextmenuWrapper}
        style={{
          ...calculatePosition(),
          width: (width) ? width : "auto"
        }}
      >
          <div className={styles.contextmenuInner}>
            {
              items.map((item, index) => {
                const {
                  type,
                  name,
                  keybinding = null,
                  icon = null,
                  action = null,
                  leaveContextMenuOpenAfterAction = false,
                  // items = []
                } = item;

                switch(type) {
                  case 'item': {
                    return (
                      <Item
                        key={index}
                        name={name}
                        keybinding={keybinding}
                        icon={icon}
                        action={action}
                        onClose={(leaveContextMenuOpenAfterAction) ? () => null : onClose}
                      />
                    )
                  }

                  case 'separator': {
                    return (
                      <Separator
                        key={index}
                      />
                    )
                  }

                  default: {
                    return null;
                  }
                }
              })
            }
          </div>
      </div>
    </CSSTransition>,
    document.getElementById('contextmenu-root')
  )
}

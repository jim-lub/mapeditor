import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Select } from './components/Select';

import styles from './contextmenu.module.css';

export default ({
  clientX, clientY, innerWidth, innerHeight,
  children, props,
  onClose
}) => {
  const outerElement = useRef();
  const innerElementHeight = 30; // height of select, toggle, parent items
  const outerElementHeight = (children.length * 30);

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
    <div
      ref={outerElement}
      className={styles.contextmenuWrapper}
      style={ calculatePosition() }
    >
      {
        children.map(({ name, type, onClick }, index) => {
          return <Select key={index} height={innerElementHeight} name={name} onClick={onClick} />
        })
      }
    </div>,
    document.getElementById('contextmenu-root')
  )
}

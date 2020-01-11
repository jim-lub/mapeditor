import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import FocusTrap from 'focus-trap-react';

import styles from './modal.module.css';

export default ({ children, isVisible = false, width = 500, height = 'auto', onClose }) => {
  if (!isVisible) return null;

  const outerElement = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  //eslint-disable-next-line
  }, []);

  const handleClick = (e) => {
    if (outerElement.current) {
      return outerElement.current.contains(e.target) ? null : handleClose(e)
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  }

  return ReactDOM.createPortal(
    <FocusTrap>
      <div className={styles.wrapper}>
        <div className={styles.overlay}/>

        <div className={styles.modalWrapper}>
          <div ref={outerElement} className={styles.modal} style={{maxWidth: width, height}}>
            { children }
          </div>
        </div>
        <button className={styles.focusTrapButton} onClick={handleClose}></button>
      </div>
    </FocusTrap>
  ,
  document.getElementById('modal-root')
  );
}

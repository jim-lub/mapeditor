import React from 'react';

import styles from './toolbar.module.css';

export default ({ disabled, openCreateSceneModal }) => {
  const handleModalOpen = (e) => {
    openCreateSceneModal();
  }

  return (
      <div className={"clearfix " + styles.wrapper}>
        <button className={styles.button} onClick={handleModalOpen} disabled={disabled}></button>
      </div>
  )
}

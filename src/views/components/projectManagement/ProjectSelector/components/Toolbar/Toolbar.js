import React from 'react';

import styles from './toolbar.module.css';

export default ({ openCreateProjectModal }) => {
  const handleModalOpen = (e) => {
    openCreateProjectModal();
  }

  return (
      <div className={"clearfix " + styles.wrapper}>
        <button className={styles.button} onClick={handleModalOpen}></button>
      </div>
  )
}

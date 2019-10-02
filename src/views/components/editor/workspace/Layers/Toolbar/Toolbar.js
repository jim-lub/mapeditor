import React from 'react';

import styles from '../layers.module.css';

export default ({ openCreateLayerModal }) => {
  const handleCreateLayerClick = (e) => {
    e.preventDefault();
    openCreateLayerModal();
  }

  return (
      <button
        className={"blue " + styles.toolbarCreateLayerButton}
        onClick={handleCreateLayerClick}
      >
        New layer..
      </button>
  );
}

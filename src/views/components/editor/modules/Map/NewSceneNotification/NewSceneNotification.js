import React from 'react';

import { useModal } from 'lib/hooks';

import { CreateLayerModal } from 'views/components/Editor/modules/Layers/Modals';

import { ReactComponent as LayersIcon } from 'assets/static/icons/mood/blue/happy.svg';

import styles from './notification.module.css';

export default ({ width, height }) => {
  const [CreateLayerModalComponent, openCreateLayerModal] = useModal(CreateLayerModal, { width: 300 });

  const handleCreateLayerClick = (e) => {
    e.preventDefault();
    openCreateLayerModal();
  }

  return (
    <>
      <div className={styles.container} style={{width, height}}>
        <div className={styles.iconWrapper}>
          <LayersIcon className={styles.icon}/>
        </div>

        <h3 className="bold">Get started</h3>
        <h4>A brand new map.. how exciting!</h4>

        <h5>Before we can start painting we need to create a new layer.</h5><br />

        <button
          className={"blue " + styles.button}
          onClick={handleCreateLayerClick}
        >
          Create a layer
        </button>
      </div>
      <CreateLayerModalComponent />
    </>
  )
}

import React from 'react';

import { useModal } from 'lib/hooks';

import { CreateLayerModal } from 'views/components/Editor/modules/Layers/Modals';

import { ReactComponent as LayersIcon } from 'assets/static/icons/other/layers-blue.svg';
import styles from './nolayersnotification.module.css';

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

        <h3 className="bold">No layers found..</h3>
        <h4>Let's create your first layer!</h4><br />

        <button
          className={"blue " + styles.button}
          onClick={handleCreateLayerClick}
        >
          Create
        </button>
      </div>
      <CreateLayerModalComponent />
    </>
  )
}

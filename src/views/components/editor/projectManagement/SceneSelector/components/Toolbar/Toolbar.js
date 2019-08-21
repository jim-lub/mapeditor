import React from 'react';

import { useModal } from 'lib/modal';
import { CreateSceneModalTemplate } from '../../modals';

import styles from './toolbar.module.css';

export default ({ onCreateScene, disabled }) => {
  const [CreateSceneModal, openModal_createScene] = useModal(
    CreateSceneModalTemplate,
    { onCreateScene }
  );

  return (
    <>
      <div className={"clearfix " + styles.container}>
        <button className={styles.button} onClick={openModal_createScene} disabled={disabled}>+ Create Scene</button>
      </div>
      <CreateSceneModal />
    </>
  );
};

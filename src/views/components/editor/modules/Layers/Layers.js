import React from 'react';
import { connect } from 'react-redux';

import { getCurrentScene } from 'state/ducks/editor/map';
import { useModal } from 'lib/hooks';

import {
  CreateLayerModal,
  DeleteLayerModal
} from './Modals';

import { LayerList } from './LayerList';
import { Toolbar } from './Toolbar';

import styles from './layers.module.css';

const Component = ({ currentScene, layerSortOrder, contentWidth, contentHeight }) => {
  const [CreateLayerModalComponent, openCreateLayerModal] = useModal(CreateLayerModal, { width: 300 });
  const [DeleteLayerModalComponent, openDeleteLayerModal] = useModal(DeleteLayerModal, { width: 300 });

  if (!currentScene.uid) return null;

  return (
    <div style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.listWrapper}>
        <LayerList openDeleteLayerModal={openDeleteLayerModal} />
      </div>

      <div className={styles.toolbarWrapper}>
        <Toolbar openCreateLayerModal={openCreateLayerModal} />
      </div>

      <CreateLayerModalComponent />
      <DeleteLayerModalComponent />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentScene: getCurrentScene(state)
  }
}

export default connect(mapStateToProps)(Component);

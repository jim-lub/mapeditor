import React from 'react';
import { connect } from 'react-redux';

import { disableAllEditorInput } from 'state/ducks/editor';
import { getCurrentScene } from 'state/ducks/editor/map';
import { getLayerSortOrder } from 'state/ducks/editor/layers';

import { useModal } from 'lib/hooks';

import {
  CreateLayerModal,
  DeleteLayerModal
} from './Modals';

import { LayerList } from './LayerList';
import { Toolbar } from './Toolbar';
import { Loader } from 'views/components/Loader';
import { NoLayersNotification } from './NoLayersNotification';

import styles from './layers.module.css';

const Component = ({ currentScene, layerSortOrder, disableAllInput, contentWidth, contentHeight }) => {
  const [CreateLayerModalComponent, openCreateLayerModal] = useModal(CreateLayerModal, { width: 300 });
  const [DeleteLayerModalComponent, openDeleteLayerModal] = useModal(DeleteLayerModal, { width: 300 });

  if (!currentScene.uid) return null;

  if (layerSortOrder.length === 0) {
    return (
      <div style={{width: contentWidth, height: contentHeight, overflow: 'auto'}}>
        <NoLayersNotification width={contentWidth / 1.5} height={contentHeight / 1.5}/>
      </div>
    )
  }

  return (
    <div style={{width: contentWidth, height: contentHeight}}>
      <div className={styles.listWrapper}>
        <LayerList openDeleteLayerModal={openDeleteLayerModal} />
      </div>

      <div className={styles.toolbarWrapper}>
        <Toolbar openCreateLayerModal={openCreateLayerModal} />
      </div>

      { disableAllInput && <Loader.Overlay /> }

      <CreateLayerModalComponent />
      <DeleteLayerModalComponent />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentScene: getCurrentScene(state),
    layerSortOrder: getLayerSortOrder(state),
    disableAllInput: disableAllEditorInput(state)
  }
}

export default connect(mapStateToProps)(Component);

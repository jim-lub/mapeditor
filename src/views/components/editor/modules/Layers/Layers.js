import React from 'react';
import { connect } from 'react-redux';

import { disableAllEditorInput } from 'state/ducks/editor';
import { getCurrentScene } from 'state/ducks/editor/map';
import { getLayerSortOrder } from 'state/ducks/editor/layers';

import { Modal, useModal } from 'views/components/Modal';

import {
  CreateLayerForm,
  DeleteLayerConfirmation
} from 'views/components/Editor/modals';

import { LayerList } from './LayerList';
import { Toolbar } from './Toolbar';
import { Loader } from 'views/components/Loader';
import { NoLayersNotification } from './NoLayersNotification';

import styles from './layers.module.css';

const Component = ({ currentScene, layerSortOrder, disableAllInput, contentWidth, contentHeight }) => {
  const [isVisible_createLayer, openModal_createLayer, closeModal_createLayer] = useModal();
  const [isVisible_deleteLayer, openModal_deleteLayer, closeModal_deleteLayer, props_deleteLayer] = useModal();

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
        <LayerList openDeleteLayerModal={openModal_deleteLayer} />
      </div>

      <div className={styles.toolbarWrapper}>
        <Toolbar openCreateLayerModal={openModal_createLayer} />
      </div>

      { disableAllInput && <Loader.Overlay /> }

      <Modal isVisible={isVisible_createLayer} onClose={closeModal_createLayer}>
        <CreateLayerForm onClose={closeModal_createLayer} />
      </Modal>

      <Modal isVisible={isVisible_deleteLayer} onClose={closeModal_deleteLayer}>
        <DeleteLayerConfirmation onClose={closeModal_deleteLayer} {...props_deleteLayer} />
      </Modal>
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

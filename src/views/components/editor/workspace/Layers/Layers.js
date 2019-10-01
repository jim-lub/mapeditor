import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateLayerProperties,
  updateLayerSortOrder,
  setActiveLayer,

  getActiveLayerId,
  getLayerSortOrder,
  getLayerProperties,
} from 'state/ducks/editor/map';

import { useModal } from 'lib/hooks';
import * as layerTypes from 'lib/constants/layerTypes';

import {
  CreateLayerModal,
  DeleteLayerModal
} from './Modals';

import { LayerList } from './LayerList';

import styles from './layers.module.css';
import workspaceStyles from '../workspace.module.css';

const Component = ({
  activeLayerId, layerSortOrder, allLayerProperties,
  actions
}) => {
  const [CreateLayerModalComponent, openCreateLayerModal] = useModal(CreateLayerModal, { width: 300 });
  const [DeleteLayerModalComponent, openDeleteLayerModal] = useModal(DeleteLayerModal, { width: 300 });

  const handleCreateLayerModal = () => {
    openCreateLayerModal()
  }

  return (
    <>
    <div className={workspaceStyles.moduleWrapperOuterFlex}>
      <div className={workspaceStyles.moduleWrapperInner}>
        <div className={workspaceStyles.moduleHeader}>Layers</div>
        <div>
          <button onClick={handleCreateLayerModal}>New</button>
        </div>
        <div className={styles.layerListWrapper}>
          <LayerList
            activeLayerId={activeLayerId}
            layerSortOrder={layerSortOrder}
            allLayerProperties={allLayerProperties}
            onSortOrderChange={actions.updateLayerSortOrder}
            setActiveLayer={actions.setActiveLayer}
            openDeleteLayerModal={openDeleteLayerModal}
          />
        </div>
      </div>
    </div>
      <CreateLayerModalComponent />
      <DeleteLayerModalComponent />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    activeLayerId: getActiveLayerId(state),
    layerSortOrder: getLayerSortOrder(state),
    allLayerProperties: getLayerProperties(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateLayerProperties, updateLayerSortOrder, setActiveLayer }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

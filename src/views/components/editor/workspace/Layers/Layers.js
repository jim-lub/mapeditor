import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Scrollbars } from 'react-custom-scrollbars';

import {
  updateLayerProperties,
  updateLayerSortOrder,
  setActiveLayer,
  toggleLayerVisibility,

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

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';
import { LayerList } from './LayerList';

import styles from './layers.module.css';

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
      <WorkspaceModuleWrapper moduleName="Layers">
        <div className={styles.topBar}>
          <button onClick={handleCreateLayerModal} style={{padding: 3}}>New</button>
        </div>
        <div className={styles.layerListWrapper}>
        <AutoSizer>
          {
            ({ width, height }) => {
              return (
                <Scrollbars autoHide style={{width, height}}>
                  <LayerList
                    activeLayerId={activeLayerId}
                    layerSortOrder={layerSortOrder}
                    allLayerProperties={allLayerProperties}
                    onSortOrderChange={actions.updateLayerSortOrder}
                    setActiveLayer={actions.setActiveLayer}
                    openDeleteLayerModal={openDeleteLayerModal}
                    toggleLayerVisibility={actions.toggleLayerVisibility}
                  />
                </Scrollbars>
              )
            }
          }
        </AutoSizer>
      </div>
    </WorkspaceModuleWrapper>

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
    actions: bindActionCreators({ updateLayerProperties, updateLayerSortOrder, setActiveLayer, toggleLayerVisibility }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

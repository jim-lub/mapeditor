import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateLayerSortOrder,
  setActiveLayer,

  getActiveLayerId,
  getLayerSortOrder,
  getLayerProperties,
} from 'state/ducks/editor/map';

import { LayerList } from './LayerList';

import styles from './layers.module.css';
import workspaceStyles from '../workspace.module.css';

const Component = ({
  activeLayerId, layerSortOrder, allLayerProperties,
  actions
}) => {
  return (
    <div className={workspaceStyles.moduleWrapperOuterFlex}>
      <div className={workspaceStyles.moduleWrapperInner}>
        <div className={workspaceStyles.moduleHeader}>Layers</div>
        <div className={styles.layerListWrapper}>
          <LayerList
            activeLayerId={activeLayerId}
            layerSortOrder={layerSortOrder}
            allLayerProperties={allLayerProperties}
            onSortOrderChange={actions.updateLayerSortOrder}
            setActiveLayer={actions.setActiveLayer}
          />
        </div>
      </div>
    </div>
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
    actions: bindActionCreators({ updateLayerSortOrder, setActiveLayer }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

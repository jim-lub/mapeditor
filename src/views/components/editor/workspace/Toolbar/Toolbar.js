import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

// import { useKeyPress } from 'lib/hooks';

import * as toolTypes from 'lib/constants/toolTypes';
// import toolConstants from 'lib/constants/toolConstants';

import {
  zoomIn,
  zoomOut,
  resetZoom,

  setCurrentTool,
  getCurrentTool
} from 'state/ducks/editor/tools';

import {
  getActiveLayerId,
  getLayerPropertiesById
} from 'state/ducks/editor/layers';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import ToolNode from './ToolNode';

import styles from './toolbar.module.css';

const Component = ({ activeLayerId, activeTool, disableAllInput, actions, getLayerPropertiesById }) => {
  const [layerProperties, setLayerProperties] = useState();

  useEffect(() => {
    setLayerProperties(
      getLayerPropertiesById(activeLayerId)
    );
  }, [activeLayerId, getLayerPropertiesById])

  return (
    <div className={styles.wrapper}>
      {
        Object.values(toolTypes).map(toolType => {
          return (
            <ToolNode
              key={toolType}
              toolType={toolType}
              isActive={(activeTool === toolType)}
              onSelect={actions.setCurrentTool}
              disableAllInput={disableAllInput}
              layerType={(layerProperties) ? layerProperties.layerType : null}
            />
          )
        })
      }

      { /* ZOOM TOOLS */ }
      <div className={styles.zoomButtonsContainer}>
        <button className={styles.node} onClick={actions.zoomIn}>+</button>
        <button className={styles.node} onClick={actions.zoomOut}>-</button>
        <button className={styles.node} onClick={actions.resetZoom}>reset</button>
      </div>

      <ReactTooltip id="toolbar-tooltip-handler" place="right" delayShow={100} className={styles.toolbarTooltip} type="light" border={true}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeLayerId: getActiveLayerId(state),
    activeTool: getCurrentTool(state),
    disableAllInput: isAllEditorInputDisabled(state),
    getLayerPropertiesById: (layerId) => getLayerPropertiesById(state, { layerId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ zoomIn, zoomOut, resetZoom, setCurrentTool }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

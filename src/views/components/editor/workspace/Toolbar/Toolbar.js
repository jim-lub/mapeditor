import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

// import { useKeyPress } from 'lib/hooks';

import * as toolTypes from 'lib/constants/toolTypes';
// import toolConstants from 'lib/constants/toolConstants';

import {
  setActiveTool,
  getActiveTool
} from 'state/ducks/editor/tools';

import {
  getActiveLayerId,
  getLayerPropertiesById,
  getDisableAllInput
} from 'state/ducks/editor/map';

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
              onSelect={actions.setActiveTool}
              disableAllInput={disableAllInput}
              layerType={(layerProperties) ? layerProperties.type : null}
            />
          )
        })
      }
      <ReactTooltip id="toolbar-tooltip-handler" place="right" delayShow={100} className={styles.toolbarTooltip} type="light" border={true}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeLayerId: getActiveLayerId(state),
    activeTool: getActiveTool(state),
    disableAllInput: getDisableAllInput(state),
    getLayerPropertiesById: (layerId) => getLayerPropertiesById(state, { layerId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setActiveTool }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

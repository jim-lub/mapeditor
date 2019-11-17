import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

import { getActiveLayerProperties } from 'state/ducks/editor/layers';

import {
  zoomIn,
  resetZoom,
  zoomOut
} from 'state/ducks/editor/tools';

import {
  setCurrentTool,
  getCurrentTool
} from 'state/ducks/editor/tools';

import { disableAllEditorInput } from 'state/ducks/editor';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import { UserInputHelper } from '../UserInputHelper';

import { Tool } from './Tool';
import { Action } from './Action';

import { ReactComponent as zoomInIcon } from 'assets/static/icons/editor/zoom-in.svg';
import { ReactComponent as zoomResetIcon } from 'assets/static/icons/editor/zoom-reset.svg';
import { ReactComponent as zoomOutIcon } from 'assets/static/icons/editor/zoom-out.svg';

import styles from './actionbar.module.css';

const Component = ({ layerProperties, currentTool, disabled, actions }) => {

  const handleToolClick = ({ toolType }) => actions.setCurrentTool({ toolType });

  const handleZoomIn = () => actions.zoomIn({ type: moduleTypes.map });
  const handleResetZoom = () => actions.resetZoom({ type: moduleTypes.map });
  const handleZoomOut = () => actions.zoomOut({ type: moduleTypes.map });

  const renderTools = () => {
    return Object.values(toolTypes)
      .map(toolType => {
        const { name, description, icon, isAllowedOnLayers } = toolConstants[toolType];
        const toolDisabled = disabled || !isAllowedOnLayers.includes( layerProperties.layerType );

        return (
          <Tool
            key={name}
            toolType={toolType}
            name={name}
            description={description}
            icon={icon}
            disabled={toolDisabled}
            currentTool={currentTool}
            onClick={handleToolClick}
          />
        )
      })
  }

  const renderActions = () => {
    const actions = [
      {
        name: 'Zoom In',
        description: '',
        icon: zoomInIcon,
        action: handleZoomIn
      },
      {
        name: 'Reset Zoom',
        description: '',
        icon: zoomResetIcon,
        action: handleResetZoom
      },
      {
        name: 'Zoom Out',
        description: '',
        icon: zoomOutIcon,
        action: handleZoomOut
      }
    ];

    return Object.values(actions)
      .map(({ name, description, icon, action }) => {

        return (
          <Action
            key={name}
            name={name}
            description={description}
            icon={icon}
            disabled={disabled}
            onClick={action}
          />
        )
      })
  }

  return (
    <>
      <div className={"clearfix " + styles.actionbarContainer}>
        <div className={styles.toolGroup}>
          <div className={styles.textContainer}>Tools</div>
          <div className={"clearfix"}>{ renderTools() }</div>
        </div>

        <div className={styles.actionGroup}>
          <div className={styles.textContainer}>Actions</div>
          <div className={"clearfix"}>{ renderActions() }</div>
        </div>

        <div className={styles.toggleGroup}>
          <div className={styles.textContainer} style={{height: 18}}></div>
          <div className={"clearfix"}></div>
        </div>

        <div className={styles.inputHelperGroup}>
          <div className={styles.textContainer}>Input helper</div>
          <UserInputHelper />
        </div>
      </div>

      <ReactTooltip
        id="actionbar-tooltip-handler"
        place="bottom"
        delayShow={100}
        className={styles.tooltip}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    layerProperties: getActiveLayerProperties(state),
    currentTool: getCurrentTool(state),
    disableAllInput: disableAllEditorInput(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setCurrentTool,

      zoomIn,
      resetZoom,
      zoomOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

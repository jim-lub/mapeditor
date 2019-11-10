import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import {
  zoomIn,
  resetZoom,
  zoomOut
} from 'state/ducks/editor/tools';

import {
  setCurrentTool,
  getCurrentTool
} from 'state/ducks/editor/tools';

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

const Component = ({ currentTool, disableAllInput, disabled, actions }) => {
  const disable = disabled || disableAllInput;

  const handleToolClick = ({ toolType }) => actions.setCurrentTool({ toolType });

  const handleZoomIn = () => actions.zoomIn({ type: moduleTypes.map });
  const handleResetZoom = () => actions.resetZoom({ type: moduleTypes.map });
  const handleZoomOut = () => actions.zoomOut({ type: moduleTypes.map });

  const renderTools = () => {
    return Object.values(toolTypes)
      .map(toolType => {
        const { name, description, icon } = toolConstants[toolType];

        return (
          <Tool
            key={name}
            toolType={toolType}
            name={name}
            description={description}
            icon={icon}
            disabled={disable}
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
            disabled={disable}
            onClick={action}
          />
        )
      })
  }

  return (
    <>
      <div className={"clearfix " + styles.actionbarContainer}>
        { renderTools() }

        <div className={styles.spacer} />

        { renderActions() }

        <div className={styles.userInputHelperWrapper}>
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
    currentTool: getCurrentTool(state),
    disableAllInput: isAllEditorInputDisabled(state)
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

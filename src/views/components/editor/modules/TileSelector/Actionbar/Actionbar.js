import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

import { disableAllEditorInput } from 'state/ducks/editor';

import {
  zoomIn,
  resetZoom,
  zoomOut
} from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { Action } from './Action';

import { ReactComponent as zoomInIcon } from 'assets/static/icons/editor/zoom-in.svg';
import { ReactComponent as zoomResetIcon } from 'assets/static/icons/editor/zoom-reset.svg';
import { ReactComponent as zoomOutIcon } from 'assets/static/icons/editor/zoom-out.svg';

import styles from './actionbar.module.css';

const Component = ({ currentTool, disabled, actions }) => {

  const handleZoomIn = () => actions.zoomIn({ type: moduleTypes.tileSelector });
  const handleResetZoom = () => actions.resetZoom({ type: moduleTypes.tileSelector });
  const handleZoomOut = () => actions.zoomOut({ type: moduleTypes.tileSelector });

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
        <div className={styles.actionGroup}>
          <div className={styles.textContainer}>Actions</div>
          <div className={"clearfix"}>{ renderActions() }</div>
        </div>

        <div className={styles.toggleGroup}>
          <div className={styles.textContainer} style={{height: 18}}></div>
          <div className={"clearfix"}></div>
        </div>
      </div>

      <ReactTooltip
        id="tileselector-actionbar-tooltip-handler"
        place="bottom"
        delayShow={100}
        className={styles.tooltip}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    disableAllInput: disableAllEditorInput(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      zoomIn,
      resetZoom,
      zoomOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

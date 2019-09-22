import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

import { useKeyPress } from 'lib/hooks';

import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import {
  setActiveTool,
  getActiveTool
} from 'state/ducks/editor/tools';

import {
  getDisableAllInput
} from 'state/ducks/editor/map';

import ToolNode from './ToolNode';

import styles from './toolbar.module.css';

const Component = ({ activeTool, disableAllInput, actions }) => {
  const keyEventListener = {
    paintBrush: useKeyPress( toolConstants[toolTypes.paintBrush].keybinding ),
    tileStamp: useKeyPress( toolConstants[toolTypes.tileStamp].keybinding ),
    eraser: useKeyPress( toolConstants[toolTypes.eraser].keybinding ),
    hand: useKeyPress( toolConstants[toolTypes.hand].keybinding ),
  }

  useEffect(() => {
    Object.entries(keyEventListener)
      .filter(([key, val]) => val)
      .forEach(([key, val]) => {
        if (toolTypes[key] !== activeTool) {
          actions.setActiveTool({ toolType: toolTypes[key] })
        }
      });
  }, [keyEventListener, activeTool, actions]);

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
              disabled={disableAllInput}
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
    activeTool: getActiveTool(state),
    disableAllInput: getDisableAllInput(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setActiveTool }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

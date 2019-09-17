import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useKeyPress } from 'lib/hooks';

import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import {
  setActiveTool,
  getActiveTool
} from 'state/ducks/editor/tools';

import ToolNode from './ToolNode';

import styles from './toolbar.module.css';

const Component = ({ activeTool, actions }) => {
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
  }, [keyEventListener]);

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
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeTool: getActiveTool(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setActiveTool }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

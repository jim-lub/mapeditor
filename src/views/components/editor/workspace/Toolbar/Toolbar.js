import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useKeyPress } from 'lib/hooks';

import * as toolTypes from 'lib/constants/toolTypes';

import {
  setActiveTool,
  getActiveTool
} from 'state/ducks/editor/tools';

import ToolNode from './ToolNode';

import styles from './toolbar.module.css';

const Component = ({ activeTool, actions }) => {
  const [eraserModifier, setEraserModifier] = useState(false);
  const [handModifier, setHandModifier] = useState(false);
  const altModifier = useKeyPress('Alt');
  const hModifier = useKeyPress('h');

  useEffect(() => {
    if (toolTypes.paintBrush === activeTool) {
      return (altModifier)
        ? setEraserModifier(true)
        : setEraserModifier(false)
    }

    if (toolTypes.tileStamp === activeTool) {
      return (altModifier)
        ? setEraserModifier(true)
        : setEraserModifier(false)
    }
  }, [activeTool, altModifier, setEraserModifier]);

  useEffect(() => {
    return (hModifier)
      ? setHandModifier(true)
      : setHandModifier(false)
  }, [activeTool, hModifier, setHandModifier]);

  return (
    <div className={styles.wrapper}>
      {
        Object.values(toolTypes).map(toolType => {
          return (
            <ToolNode
              key={toolType}
              toolType={toolType}
              isActive={(activeTool === toolType)}
              isModifier={
                (toolTypes.eraser === toolType && eraserModifier) ||
                (toolTypes.hand === toolType && handModifier)
              }
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

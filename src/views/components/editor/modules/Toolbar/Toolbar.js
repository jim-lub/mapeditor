import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';

import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import {
  setCurrentTool,
  getCurrentTool
} from 'state/ducks/editor/tools';

import { ToolNode } from './ToolNode';

import styles from './toolbar.module.css';

const Component = ({ contentWidth, contentHeight, currentTool, actions }) => {
  	return (
      <div className={styles.wrapper} style={{width: contentWidth - 2}}>
        {
          Object.values(toolTypes).map(toolType => {
            const { name, description, icon, keybinding } = toolConstants[toolType];

            return (
              <ToolNode
                key={toolType}
                toolType={toolType}
                name={name}
                description={description}
                icon={icon}
                keybinding={keybinding}
                current={(currentTool === toolType)}
                onSelect={actions.setCurrentTool}
              />
            )
          })
        }

        <ReactTooltip
          id="toolbar-tooltip-handler"
          place="right"
          delayShow={100}
          className={styles.tooltip}
        />
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    currentTool: getCurrentTool(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setCurrentTool }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

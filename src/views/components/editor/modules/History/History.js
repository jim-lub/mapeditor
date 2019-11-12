import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import {
  getUndoCollection,
  getRedoCollection
} from 'state/ducks/editor/history';

import { concatClassNames } from 'lib/utils';

// import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import { Actionbar } from './Actionbar';

import { ReactComponent as undoIcon } from 'assets/static/icons/editor/undo-2.svg';
import { ReactComponent as redoIcon } from 'assets/static/icons/editor/redo-2.svg';

import styles from './history.module.css';

const Component = ({ undoCollection, redoCollection, actions, contentWidth, contentHeight }) => {
  const renderUndoHistory = () => {

    return undoCollection.map(({ type, toolType, list }, index) => {
      const ToolTypeIcon = toolConstants[toolType].icon;
      const UndoIcon = undoIcon;
      const listCount = list.length;

      const undoContainerClassName = concatClassNames([
        "clearfix",
        styles.undoContainer,
        (index === 0) ? styles.current : null
      ])

      return (
        <div key={index} className={undoContainerClassName}>
          <div className={styles.undoWrapper}>
            <UndoIcon className={styles.icon}/>
          </div>
          <div className={styles.toolTypeWrapper}>
            <ToolTypeIcon className={styles.toolTypeIcon}/>
          </div>
          <div className={styles.typeWrapper}>
            { type }
          </div>
          <div className={styles.tileCountWrapper}>
            <span className="bold">{ listCount }</span> tile(s)
          </div>
        </div>
      )
    });
  }

  const renderRedoHistory = () => {
    const reversedRedoCollection = _.reverse(_.clone(redoCollection));

    return reversedRedoCollection.map(({ type, toolType, list }, index) => {
      const ToolTypeIcon = toolConstants[toolType].icon;
      const RedoIcon = redoIcon;
      const listCount = list.length;

      const redoContainerClassName = concatClassNames([
        "clearfix",
        styles.redoContainer
      ])

      return (
        <div key={index} className={redoContainerClassName}>
          <div className={styles.redoWrapper}>
            <RedoIcon className={styles.icon}/>
          </div>
          <div className={styles.toolTypeWrapper}>
            <ToolTypeIcon className={styles.toolTypeIcon}/>
          </div>
          <div className={styles.typeWrapper}>
            { type }
          </div>
          <div className={styles.tileCountWrapper}>
            <span className="bold">{ listCount }</span> tile(s)
          </div>
        </div>
      )
    });
  }

  return (
    <div className={styles.wrapper} style={{width: contentWidth, height: contentHeight}}>

      <div className={styles.content} style={{overflow: 'auto'}}>
        { renderRedoHistory() }
        { renderUndoHistory() }
      </div>

      <div className={styles.actionbar}>
      <Actionbar />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    undoCollection: getUndoCollection(state),
    redoCollection: getRedoCollection(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

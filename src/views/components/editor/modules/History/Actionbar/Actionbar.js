import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  undo,
  redo,

  getUndoCount,
  getRedoCount
} from 'state/ducks/editor/history';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import { Action } from './Action';

import { ReactComponent as undoIcon } from 'assets/static/icons/editor/undo.svg';
import { ReactComponent as redoIcon } from 'assets/static/icons/editor/redo.svg';

import styles from './actionbar.module.css';

const Component = ({ undoCount, redoCount, disabled, actions }) => {
  const handleUndo = () => actions.undo();
  const handleRedo = () => actions.redo();

  const renderActions = () => {
    const actions = [
      {
        name: 'Undo',
        description: '',
        icon: undoIcon,
        action: handleUndo,
        disable: (undoCount === 0)
      },
      {
        name: 'Redo',
        description: '',
        icon: redoIcon,
        action: handleRedo,
        disable: (redoCount === 0)
      }
    ];

    return Object.values(actions)
      .map(({ name, description, icon, action, disable }) => {
        const disableAction = disable || disabled;

        return (
          <Action
            key={name}
            name={name}
            description={description}
            icon={icon}
            disabled={disableAction}
            onClick={action}
          />
        )
      })
  }

  return (
    <>
      <div className={"clearfix " + styles.actionbarContainer}>
        <div className={styles.actionGroup}>
          <div className={"clearfix"}>{ renderActions() }</div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    undoCount: getUndoCount(state),
    redoCount: getRedoCount(state),
    disabled: isAllEditorInputDisabled(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      undo,
      redo
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

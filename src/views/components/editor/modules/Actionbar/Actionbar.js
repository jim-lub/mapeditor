import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { storeMap } from 'state/ducks/editor/map';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import {
  zoomIn,
  resetZoom,
  zoomOut
} from 'state/ducks/editor/tools';

import { ActionNode } from './ActionNode';

import { ReactComponent as saveIcon } from 'assets/static/icons/editor/save.svg';

import styles from './actionbar.module.css';

const Component = ({ storemapStatus, disableAllInput, actions }) => {
  return (
    <div className={"clearfix " + styles.actionbarWrapper}>
      <ActionNode icon={saveIcon} action={actions.storeMap} disabled={disableAllInput} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    storeMapStatus: getRequestStatus(state, { key: 'storeMap' }),
    disableAllInput: isAllEditorInputDisabled(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      storeMap,

      zoomIn,
      resetZoom,
      zoomOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

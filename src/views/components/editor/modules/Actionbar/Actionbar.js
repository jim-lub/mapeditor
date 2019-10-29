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
import { ReactComponent as zoomInIcon } from 'assets/static/icons/editor/zoom-in.svg';
import { ReactComponent as zoomResetIcon } from 'assets/static/icons/editor/zoom-reset.svg';
import { ReactComponent as zoomOutIcon } from 'assets/static/icons/editor/zoom-out.svg';

import styles from './actionbar.module.css';

const Component = ({ storemapStatus, disableAllInput, actions }) => {
  return (
    <div className={"clearfix " + styles.actionbarWrapper}>
      <ActionNode icon={saveIcon} action={actions.storeMap} disabled={disableAllInput} />

      <div className={styles.spacer} />

      <ActionNode icon={zoomInIcon} action={actions.zoomIn} disabled={disableAllInput} />
      <ActionNode icon={zoomResetIcon} action={actions.resetZoom} disabled={disableAllInput} />
      <ActionNode icon={zoomOutIcon} action={actions.zoomOut} disabled={disableAllInput} />
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

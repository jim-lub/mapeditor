import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

import {
  zoomIn,
  resetZoom,
  zoomOut
} from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { Item } from './Item';

import { ReactComponent as zoomInIcon } from 'assets/static/icons/editor/zoom-in.svg';
import { ReactComponent as zoomResetIcon } from 'assets/static/icons/editor/zoom-reset.svg';
import { ReactComponent as zoomOutIcon } from 'assets/static/icons/editor/zoom-out.svg';

import styles from './actionbar.module.css';

const Component = ({ disableAllInput, actions }) => {
  const handleZoomIn = () => actions.zoomIn({ type: moduleTypes.tileSelector });
  const handleResetZoom = () => actions.resetZoom({ type: moduleTypes.tileSelector });
  const handleZoomOut = () => actions.zoomOut({ type: moduleTypes.tileSelector });

  return (
    <div className={"clearfix " + styles.actionbarWrapper}>
      <Item icon={zoomInIcon} action={handleZoomIn} disabled={disableAllInput} />
      <Item icon={zoomResetIcon} action={handleResetZoom} disabled={disableAllInput} />
      <Item icon={zoomOutIcon} action={handleZoomOut} disabled={disableAllInput} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    disableAllInput: isAllEditorInputDisabled(state)
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

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { handleCanvasUpdate } from 'state/ducks/editor';
// import { newUndoAction } from 'state/ducks/editor/history';

import {
  getActiveLayerProperties,
  getLayerSortOrder
} from 'state/ducks/editor/layers';

import { getMapProperties } from 'state/ducks/editor/map';
// import { handleUserInput } from 'state/ducks/editor/user-input';

import { validateSegment } from 'state/ducks/editor/segments';

import {
  getCurrentTool,
  getZoomScaleModifier
} from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { SelectionOverlay } from '../SelectionOverlay';
import { UserInput } from '../UserInput';

import styles from '../segment.module.css';

const Component = ({
  segmentId, segmentSize,
  activeLayerProperties, layerSortOrder,
  currentTool, zoomScaleModifier,
  actions
}) => {

  // const scaledSegmentSize = {
  //   width: segmentSize.width * zoomScaleModifier,
  //   height: segmentSize.height * zoomScaleModifier
  // }

  useEffect(() => {
    actions.validateSegment({ segmentId });
  }, [segmentId, layerSortOrder, actions]);

  return (
    <div className={styles.controllerWrapper} style={{fontSize: 20 * zoomScaleModifier}}>
      { segmentId }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    segmentSize: getMapProperties(state).segmentSize,

    activeLayerProperties: getActiveLayerProperties(state),
    layerSortOrder: getLayerSortOrder(state),

    currentTool: getCurrentTool(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      validateSegment
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

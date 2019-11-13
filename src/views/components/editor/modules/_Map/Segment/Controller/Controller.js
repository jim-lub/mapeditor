import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import { handleCanvasUpdate } from 'state/ducks/editor';
// import { newUndoAction } from 'state/ducks/editor/history';

import {
  getActiveLayerProperties,
  getLayerSortOrder
} from 'state/ducks/editor/layers';

// import { getMapProperties } from 'state/ducks/editor/map';
// import { handleUserInput } from 'state/ducks/editor/user-input';

import { validateTilemapDataSegmentTest } from 'state/ducks/editor/tilemap';

import {
  getCurrentTool,
  getZoomScaleModifier
} from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { Canvas } from '../Canvas';
import { SelectionOverlay } from '../SelectionOverlay';
import { UserInput } from '../UserInput';

const Component = ({
  segmentId,
  activeLayerProperties, layerSortOrder,
  currentTool, zoomScaleModifier,
  actions
}) => {
  useEffect(() => {
    actions.validateTilemapDataSegmentTest({ segmentId });
  }, [segmentId, layerSortOrder, actions])

  return (
    <div>Segment: { segmentId }</div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeLayerProperties: getActiveLayerProperties(state),
    layerSortOrder: getLayerSortOrder(state),

    currentTool: getCurrentTool(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ validateTilemapDataSegmentTest }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

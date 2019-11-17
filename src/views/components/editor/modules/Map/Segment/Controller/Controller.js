import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { userInputActionsAllowedOnMap } from 'state/ducks/editor';
// import { newUndoAction } from 'state/ducks/editor/history';

import {
  getActiveLayerProperties,
  getLayerSortOrder
} from 'state/ducks/editor/layers';

import { getMapProperties } from 'state/ducks/editor/map';
import { handleUserInput } from 'state/ducks/editor/user-input';

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
  enableUserInput, actions
}) => {
  const [active, setActive] = useState(false);

  // const scaledSegmentSize = {
  //   width: segmentSize.width * zoomScaleModifier,
  //   height: segmentSize.height * zoomScaleModifier
  // }

  useEffect(() => {
    actions.validateSegment({ segmentId });
  }, [segmentId, layerSortOrder, actions]);

  const handlePointerEnter = () => setActive(true);
  const handlePointerLeave = () => setActive(false);

  const handleUserInput = ({ columnIndex, rowIndex, inputActions, inputModifiers }) => {
    if (inputActions.hover) return;

    actions.handleUserInput({
      segmentId,
      columnIndex,
      rowIndex,
      inputActions,
      inputModifiers
    });
  }

  return (
    <div
      className={styles.controllerWrapper}
      style={{
        cursor: (enableUserInput) ? "auto" : "not-allowed"
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {
        active && enableUserInput &&
        <UserInput
          segmentSize={segmentSize}
          tileSize={activeLayerProperties.tileSize}
          zoomScaleModifier={zoomScaleModifier}
          onPointerEvent={handleUserInput}
        />
      }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    segmentSize: getMapProperties(state).segmentSize,

    activeLayerProperties: getActiveLayerProperties(state),
    layerSortOrder: getLayerSortOrder(state),

    currentTool: getCurrentTool(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map }),

    enableUserInput: userInputActionsAllowedOnMap(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      validateSegment,
      handleUserInput
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

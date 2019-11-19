import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userInputActionsAllowedOnMap } from 'state/ducks/editor';
// import { newUndoAction } from 'state/ducks/editor/history';

import {
  getActiveLayerProperties,
  getLayerSortOrder
} from 'state/ducks/editor/layers';

import { getMapProperties } from 'state/ducks/editor/map';

import {
  handleUserInput,
  getPattern
} from 'state/ducks/editor/user-input';

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
  pattern, enableUserInput, actions
}) => {
  const [selection, setSelection] = useState({ display: 'none', left: 0, top: 0 });
  const [active, setActive] = useState(false);

  // const scaledSegmentSize = {
  //   width: segmentSize.width * zoomScaleModifier,
  //   height: segmentSize.height * zoomScaleModifier
  // }

  useEffect(() => {
    actions.validateSegment({ segmentId });
  }, [segmentId, layerSortOrder, actions]);

  useEffect(() => {
    if (!active || !enableUserInput) {
      setSelection({
        display: 'none',
        left: 0,
        top: 0
      })
    }
  }, [active, enableUserInput])

  const { tileSize = { width: 0, height: 0 } } = activeLayerProperties;

  const scaledTileSize = {
    width: tileSize.width * zoomScaleModifier,
    height: tileSize.height * zoomScaleModifier
  }

  const handlePointerEnter = () => setActive(true);
  const handlePointerLeave = () => setActive(false);

  const handleUserInput = ({ columnIndex, rowIndex, inputActions, inputModifiers }) => {
    setSelection({
      display: 'block',
      left: (scaledTileSize.width) * columnIndex,
      top: (scaledTileSize.height) * rowIndex,
    });

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
          tileSize={tileSize}
          zoomScaleModifier={zoomScaleModifier}
          onPointerEvent={handleUserInput}
        />
      }
      {
        active && enableUserInput &&
        <SelectionOverlay
          style={selection}
          grid={pattern.grid}
          tileSize={scaledTileSize}
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
    pattern: getPattern(state),
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

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  openUndoAction,
  closeUndoAction
} from 'state/ducks/editor/history';

import {
  getActiveLayerId,
  getLayerPropertiesObject,
  getLayerSortOrder,
} from 'state/ducks/editor/layers';

import {
  getMapProperties,
} from 'state/ducks/editor/map';

import {
  handleUserInput,
  handleCanvasUpdate,
  validateTilemapDataSegment,
  getTilemapDataSegmentbyId
} from 'state/ducks/editor/tilemap';

import {
  getZoomScaleModifier,
  getCurrentTool,
  getTileSelectionGrid
} from 'state/ducks/editor/tools';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import { Loader } from 'views/components/Loader';
import { Canvas, UserInput } from '../../components';

import styles from '../../segment.module.css';

const Component = ({
  segmentId, mapProperties: { segmentSize },
  activeLayerId, layerProperties, layerSortOrder,
  tilemapData, tileSelectionGrid,
  zoomScaleModifier, currentTool, actions
}) => {
  const [initialized, setInitialized] = useState(false);
  const [disablePointerInput, setDisablePointerInput] = useState(false);
  const [isActiveSegment, setIsActiveSegment] = useState(false);
  const canvasRef = useRef(null);

  const segmentSizeAfterZoomScaleModifier = {
    width: segmentSize.width * zoomScaleModifier,
    height: segmentSize.height * zoomScaleModifier
  }

  useEffect(() => {
    actions.validateTilemapDataSegment({ segmentId }).then(() => setInitialized(true))
  }, [segmentId, layerSortOrder, actions])

  useEffect(() => {
    if (initialized && canvasRef && canvasRef.current) {
      actions.handleCanvasUpdate({ segmentId, canvasRef, canvasWidth: segmentSizeAfterZoomScaleModifier.width, canvasHeight: segmentSizeAfterZoomScaleModifier.height, zoomScaleModifier });
    }
  });

  useEffect(() => {
    if (0 === 1) {
      setDisablePointerInput(true);
    } else {
      setDisablePointerInput(false);
    }
  }, [currentTool, setDisablePointerInput]);

  const handlePointerEnter = () => setIsActiveSegment(true);
  const handlePointerLeave = () => setIsActiveSegment(false);

  const handleInteractionNodeEvent = ({ columnIndex, rowIndex, inputActions, inputModifiers }) => {
    actions.handleUserInput({
      segmentId, columnIndex, rowIndex,
      inputActions,
      inputModifiers
    });
  }

  const isCurrentTool = () => {
    if (toolConstants.hasOwnProperty(currentTool)) {
      return toolConstants[currentTool].isAllowedOnLayers.includes( layerProperties[activeLayerId].layerType )
    }
    return false;
  }

  const enableUserInput = (
    isActiveSegment &&
    !disablePointerInput &&
    (layerSortOrder.length > 0) &&
    layerProperties[activeLayerId] &&
    layerProperties[activeLayerId].visible &&
    !(currentTool === toolTypes.tileStamp && tileSelectionGrid.length === 0) &&
    isCurrentTool()
  )


  if (!initialized) {
    return (
      <div className={styles.controllerWrapper} style={{ width: segmentSizeAfterZoomScaleModifier.width, height: segmentSizeAfterZoomScaleModifier.height }}>
        <div className={styles.controllerLoaderWrapper}><Loader.Simple width={48} height={48}/></div>
      </div>
    )
  }

  return (
    <div
      className={styles.controllerWrapper}
      style={{
        width: segmentSizeAfterZoomScaleModifier.width,
        height: segmentSizeAfterZoomScaleModifier.height,
        cursor: (!enableUserInput) ? "not-allowed" : null
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >

      <Canvas
      ref={canvasRef}
      canvasWidth={segmentSizeAfterZoomScaleModifier.width}
      canvasHeight={segmentSizeAfterZoomScaleModifier.height}
      />

      {
        enableUserInput &&
        <UserInput
          segmentSize={segmentSize}
          zoomScaleModifier={zoomScaleModifier}
          layerProperties={layerProperties[activeLayerId]}
          currentTool={currentTool}
          onPointerEvent={handleInteractionNodeEvent}
          tileSelectionGrid={tileSelectionGrid}
          openUndoAction={actions.openUndoAction}
          closeUndoAction={actions.closeUndoAction}
        />
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { segmentId } = ownProps;

  return {
    mapProperties: getMapProperties(state),
    activeLayerId: getActiveLayerId(state),
    layerProperties: getLayerPropertiesObject(state),
    layerSortOrder: getLayerSortOrder(state),
    tilemapData: getTilemapDataSegmentbyId(state, { segmentId }),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map }),
    currentTool: getCurrentTool(state),
    tileSelectionGrid: getTileSelectionGrid(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      openUndoAction,
      closeUndoAction,
      handleUserInput,
      handleCanvasUpdate,
      validateTilemapDataSegment
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';
import * as userInputHandlers from './userInputHandlers';

import {
  getCurrentScene,
  getMapProperties
} from '../map';

import {
  getActiveLayerId,
  getLayerSortOrder,
  getLayerPropertiesById,
  getLayerPropertiesObject
} from '../layers';

import { drawCanvasHandler } from 'lib/editor/canvas-api';

// import * as layerTypes from 'lib/constants/layerTypes';
import * as toolTypes from 'lib/constants/toolTypes';

export const initializeStore = ({ tilemapDataObject }) => dispatch => {
  return dispatch( actions.setTilemapDataObject({ tilemapDataObject }) );
}

export const clearStore = () => dispatch => {
  dispatch( actions.clearTilemapDataObject() );
}

export const validateTilemapDataSegment = ({ segmentId }) => (dispatch, getState) => new Promise((resolve, reject) => { // initial load of segment component -> more data to create
  const state = getState();
  const { segmentSize } = getMapProperties(state);
  const tilemapDataSegment = selectors.getTilemapDataSegmentById(state, { segmentId });
  const layerSortOrder = getLayerSortOrder(state);
  const layersToAdd = utils.findLayersToAddOnTilemapDataSegment({ tilemapDataSegment, layerSortOrder });
  const layersToRemove = utils.findLayersToRemoveFromTilemapDataSegment({ tilemapDataSegment, layerSortOrder });

  layersToAdd.map(layerId => {
    const { tileSize } = getLayerPropertiesById(state, { layerId });
    const tilemapDataSegmentLayer = utils.buildTilemapDataSegmentLayer({ segmentSize, tileSize });

    return dispatch( actions.addLayerToTilemapDataSegment({
      segmentId,
      layerId,
      tilemapDataSegmentLayer
    }));
  });

  layersToRemove.map(layerId => {
    return dispatch( actions.removeLayerFromTilemapDataSegment({
      segmentId,
      layerId
    }));
  });

  resolve();
})

export const handleUserInput = ({ segmentId, columnIndex, rowIndex, inputActions, inputModifiers }) => (dispatch, getState) => {
  const state = getState();
  const sceneId = getCurrentScene(state);
  const layerId = getActiveLayerId(state);
  const layerProperties = getLayerPropertiesById(state, { layerId });
  const currentTool = 'tools/paintBrush';

  switch (currentTool) {
    case toolTypes.paintBrush:
      return dispatch( userInputHandlers.paintBrush(state, {
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.tileStamp:
      return dispatch( userInputHandlers.tileStamp(state, {
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.eraser:
      return dispatch( userInputHandlers.eraser(state, {
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.eyeDropper:
      return dispatch( userInputHandlers.eyeDropper(state, {
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    default:
      break;
  }
}

export const handleCanvasUpdate = ({ segmentId, canvasRef, canvasWidth, canvasHeight }) => (dispatch, getState) => {
  const state = getState();

  const layerProperties = getLayerPropertiesObject(state);
  const layerSortOrder = getLayerSortOrder(state);
  const tilemapData = selectors.getTilemapDataSegmentById(state, { segmentId });

  drawCanvasHandler(canvasRef, canvasWidth, canvasHeight, {
    segmentId,
    layerProperties, layerSortOrder,
    tilemapData
  });
}

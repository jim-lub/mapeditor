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

import { getCurrentTool } from '../tools';

import { asyncIterator } from 'state/lib/utils';
import { setRequestStatus } from '../requestStatus';

import { addTask } from 'state/ducks/editor/workers';

import { drawCanvasHandler } from 'lib/editor/canvas-api';

// import * as layerTypes from 'lib/constants/layerTypes';
import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

export const initializeStore = ({ tilemapDataObject }) => dispatch => {
  return dispatch( actions.setTilemapDataObject({ tilemapDataObject }) );
}

export const clearStore = () => dispatch => {
  dispatch( actions.clearTilemapDataObject() );
}

export const validateTilemapDataSegmentTest = ({ segmentId }) => (dispatch, getState) => {
  dispatch( addTask({
    type: 'fn',
    fn: 'testCalculation',
    data: {
      segmentId,
      values: [3232, 323, 32]
    }
  }) );

  // const dataSet = [...new Array( 100 )].map(() => 0);
  //
  // asyncIterator({
  //   fn: () => [...new Array( 32 )].map((val, index) => [...new Array( 32 )].map((val, index) => ({ index }))),
  //   // fn: () => 0,
  //   dataSet,
  //   batchSize: 2
  // })
  // .then(() => {
  // });
}

export const validateTilemapDataSegment = ({ segmentId }) => (dispatch, getState) => new Promise((resolve, reject) => {
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

export const handleUserInput = ({ segmentId, columnIndex: inputColumnIndex, rowIndex: inputRowIndex, inputActions, inputModifiers }) => (dispatch, getState) => {
  const state = getState();
  const sceneId = getCurrentScene(state);
  const layerId = getActiveLayerId(state);
  const layerProperties = getLayerPropertiesById(state, { layerId });
  const currentTool = getCurrentTool(state);
  const columnIndex = Number(inputColumnIndex);
  const rowIndex = Number(inputRowIndex);

  // early exit checks
  if (!sceneId) return;
  if (!layerProperties.visible) return;
  if (!toolConstants.hasOwnProperty(currentTool)) return;
  if (!toolConstants[currentTool].isAllowedOnLayers.includes( layerProperties.layerType )) return;

  switch (currentTool) {
    case toolTypes.paintBrush:
      return dispatch( userInputHandlers.paintBrush({
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.tileStamp:
      return dispatch( userInputHandlers.tileStamp({
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.eraser:
      return dispatch( userInputHandlers.eraser({
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.eyeDropper:
      return dispatch( userInputHandlers.eyeDropper({
        sceneId, segmentId, layerId, layerProperties,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    default:
      break;
  }
}

export const handleCanvasUpdate = ({ segmentId, canvasRef, canvasWidth, canvasHeight, zoomScaleModifier }) => (dispatch, getState) => {
  const state = getState();

  const layerProperties = getLayerPropertiesObject(state);
  const layerSortOrder = getLayerSortOrder(state);
  const tilemapData = selectors.getTilemapDataSegmentById(state, { segmentId });

  drawCanvasHandler(canvasRef, canvasWidth, canvasHeight, {
    segmentId,
    layerProperties, layerSortOrder,
    tilemapData,
    zoomScaleModifier
  });
}

export const setSingleTileValue = actions.setSingleTileValue;
export const setMultipleTileValues = actions.setMultipleTileValues;

import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';
import * as userInputHandlers from './userInputHandlers';

import {
  getCurrentScene,
  getMapProperties
} from '../map';

import { getTilemapData } from '../segments';

import {
  getActiveLayerId,
  getLayerSortOrder,
  getLayerPropertiesById,
  getLayerPropertiesObject
} from '../layers';

import { getCurrentTool } from '../tools';


import { drawCanvasHandler } from 'lib/editor/canvas-api';

// import * as layerTypes from 'lib/constants/layerTypes';
import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

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

export const setSingleTileValue = actions.setSingleTileValue;
export const setMultipleTileValues = actions.setMultipleTileValues;

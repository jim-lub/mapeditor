// import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';
import * as sceneSelectors from 'state/ducks/editor/scenes';
import * as toolSelectors from 'state/ducks/editor/tools';
import * as firestore from './firestore';

import * as utils from './utils';
import * as mapGridUtils from 'lib/editor/map-grid-utils';
// import * as tilemapDataUtils from 'lib/editor/tilemap-data-utils';

import * as toolTypes from 'lib/constants/toolTypes';

import { drawCanvasHandler } from 'lib/editor/canvas-api';

export const initializeMap = ({ sceneId }) => dispatch => {
  dispatch( actions.initializeMapRequest() );

  return dispatch( firestore.fetchSceneData({ sceneId }))
    .then(sceneData => {
      const { mapProperties, chunks = "null" } = sceneData;

      dispatch( actions.setMapProperties({
        mapProperties: {
          ...mapProperties,
          chunks
        }
      }) );

      return dispatch( firestore.fetchMapGridCollection({ sceneId }) )
        .then(firestoreMapGrid => {
          dispatch( actions.setMapGrid({
            mapGrid: mapGridUtils.buildMapGrid({ mapProperties, firestoreMapGrid })
          }))
        })
    })
    .then(() => dispatch( actions.initializeMapSuccess() ))
    .catch(e => console.log(e));
}

export const storeMap = () => (dispatch, getState) => {
  dispatch( actions.storeMapRequest() );

  const state = getState();
  const sceneId = sceneSelectors.getActiveSceneId(state);
  const mapProperties = selectors.getMapProperties(state);
  const mapGrid = selectors.getMapGrid(state);

  Promise.all([
    dispatch( firestore.updateMapProperties({ sceneId, mapProperties })),
    dispatch( firestore.updateMapGridCollection({ sceneId, mapProperties, mapGrid })),
  ])
  .then(() => {
    dispatch( actions.storeMapSuccess() );
  })
  .catch(e => console.log(e));
}

export const initializeTilemapDataBySegmentId = ({ segmentId }) => dispatch => {
  dispatch( actions.initializeTilemapDataBySegmentIdRequest({ segmentId }) );

  dispatch( utils.validateTilemapDataBySegmentId({ segmentId }) )
    .then(() => {
      dispatch ( actions.initializeTilemapDataBySegmentIdSuccess({ segmentId }) )
    })
}

export const canvasController = ({ segmentId, canvasRef, canvasWidth, canvasHeight }) => (dispatch, getState) => {
  const state = getState();

  const layerProperties = selectors.getLayerProperties(state);
  const layerSortOrder = selectors.getLayerSortOrder(state);
  const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId });

  drawCanvasHandler(canvasRef, canvasWidth, canvasHeight, {
    segmentId,
    layerProperties, layerSortOrder,
    tilemapData
  });
}

export const handleUserInput = ({ segmentId, columnIndex, rowIndex, inputActions, inputModifiers }) => (dispatch, getState) => {
  const state = getState();
  const sceneId = sceneSelectors.getActiveSceneId(state);
  const layerId = selectors.getActiveLayerId(state);
  const activeTool = toolSelectors.getActiveTool(state);

  switch (activeTool) {
    case toolTypes.paintBrush:
      return dispatch( _handlePaintBrushInput(state, {
        sceneId, segmentId, layerId,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.tileStamp:
      return dispatch( _handleTilestampInput(state, {
        sceneId, segmentId, layerId,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    case toolTypes.eraser:
      return dispatch( _handleEraserInput(state, {
        sceneId, segmentId, layerId,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    default:
      break;
  }
}

const _handlePaintBrushInput = (state, { segmentId }) => dispatch => {
  const color = toolSelectors.getColor(state);
  console.log("Input: Paint brush ", color);
}

const _handleTilestampInput = (state, { segmentId }) => dispatch => {
  console.log("Input: Tilestamp");
}

const _handleEraserInput = (state, { segmentId }) => dispatch => {
  console.log("Input: Eraser");
}

export const setSingleTileValue = actions.setSingleTileValue;
export const clearSingleTileValue = actions.clearSingleTileValue;

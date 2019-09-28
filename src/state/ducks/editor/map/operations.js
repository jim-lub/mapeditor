// import { firebase } from 'state/lib/firebase';

import * as tools from 'state/ducks/editor/tools';
import * as actions from './actions';
import * as selectors from './selectors';
import * as firestore from './firestore';
import * as utils from './utils';

import * as toolTypes from 'lib/constants/toolTypes';
import { drawCanvasHandler } from 'lib/editor/canvas-api';

export const initializeMap = ({ sceneId }) => dispatch => {
  dispatch( actions.initializeMapRequest() );

  if (!sceneId) {
    return dispatch( actions.initializeMapSuccess() );
  }

  // clear old tilemapData -> fetch mapgrid -> fetch tilemapdata

  return dispatch( firestore.fetchSceneData({ sceneId }))
    .then(sceneData => {
      const { mapProperties, chunks = "null" } = sceneData;

      dispatch( actions.setMapProperties({
        mapProperties: {
          ...mapProperties,
          chunks
        }
      }) );

      return dispatch( firestore.getMapGridCollection({ sceneId }) )
        .then(firestoreMapGrid =>
          dispatch( actions.setMapGrid({
            mapGrid: utils.buildMapGrid({ mapProperties, firestoreMapGrid })
          })))
        .then(() => dispatch( firestore.getTilemapDataCollection({ sceneId }))
          .then(tilemapDataArray =>
            dispatch( actions.setTilemapDataObject({
              tilemapDataObject: tilemapDataArray.reduce((obj, data) => obj = { ...obj, ...data }, {})
            }))))
    })
    .then(() => dispatch( actions.initializeMapSuccess() ))
    .catch(e => console.log(e));
}

export const storeMap = () => (dispatch, getState) => {
  dispatch( actions.storeMapRequest() );

  const state = getState();
  const sceneId = selectors.getCurrentScene(state).uid;
  const mapProperties = selectors.getMapProperties(state);
  const mapGrid = selectors.getMapGrid(state);
  const tilemapData = selectors.getTilemapData(state);

  Promise.all([
    dispatch( firestore.updateMapProperties({ sceneId, mapProperties })),
    dispatch( firestore.updateMapGridCollection({ sceneId, mapProperties, mapGrid })),
  ])
  .then(() => Promise.all([
    dispatch( firestore.updateTilemapDataCollection({ sceneId, mapGrid, tilemapData }))
  ]))
  .then(() => {
    dispatch( actions.storeMapSuccess() );
  })
  .catch(e => console.log(e));
}

export const initializeTilemapDataBySegmentId = ({ segmentId }) => dispatch => {
  dispatch( actions.initializeTilemapDataBySegmentIdRequest({ segmentId }) );
  dispatch ( actions.initializeTilemapDataBySegmentIdSuccess({ segmentId }) );
  // dispatch( utils.validateTilemapDataBySegmentId({ segmentId }) )
  //   .then(() => {
  //     dispatch ( actions.initializeTilemapDataBySegmentIdSuccess({ segmentId }) )
  //   })
}

export const handleCanvasUpdate = ({ segmentId, canvasRef, canvasWidth, canvasHeight }) => (dispatch, getState) => {
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
  const sceneId = selectors.getCurrentScene(state).uid;
  const layerId = selectors.getActiveLayerId(state);
  const activeTool = tools.getActiveTool(state);

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

    case toolTypes.eyeDropper:
      return dispatch( _handleEyeDropperInput(state, {
        sceneId, segmentId, layerId,
        columnIndex, rowIndex,
        inputActions, inputModifiers
      }) );

    default:
      break;
  }
}

const _handlePaintBrushInput = (state, {
  sceneId, segmentId, layerId,
  columnIndex, rowIndex,
  inputActions, inputModifiers
}) => dispatch => {
  const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId })
  const color = tools.getColor(state);

  // Allow paintBrush action
  if (( inputActions.leftClick || inputActions.leftClickAndHold ) && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    if (tilemapData[layerId][columnIndex][rowIndex] === color.hex) return;

    dispatch( actions.setSingleTileValue({ segmentId, layerId, columnIndex, rowIndex, value: color.hex.substring(1) }) );
  }

  // Allow modified paintBrush action :: eraser
  if (( inputActions.leftClick || inputActions.leftClickAndHold ) && utils.inputModifiersObjectMatches(inputModifiers, ['altKey'])) {
    if (tilemapData[layerId][columnIndex][rowIndex] === 0) return;

    dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
  }
}

const _handleTilestampInput = (state, { segmentId }) => dispatch => {
  console.log("Input: Tilestamp");
}

const _handleEraserInput = (state, {
  sceneId, segmentId, layerId,
  columnIndex, rowIndex,
  inputActions, inputModifiers
}) => dispatch => {
  const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId })

  // Allow modified paintBrush action :: eraser
  if (( inputActions.leftClick || inputActions.leftClickAndHold ) && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    if (tilemapData[layerId][columnIndex][rowIndex] === 0) return;

    dispatch( actions.clearSingleTileValue({ segmentId, layerId, columnIndex, rowIndex }) );
  }
}

const _handleEyeDropperInput = (state, {
  sceneId, segmentId, layerId,
  columnIndex, rowIndex,
  inputActions, inputModifiers
}) => dispatch => {
  const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId })

  // Allow modified paintBrush action :: eraser
  if (( inputActions.leftClick || inputActions.leftClickAndHold ) && utils.inputModifiersObjectMatches(inputModifiers, [])) {
    const color = tools.getColor(state);
    const tileValue = tilemapData[layerId][columnIndex][rowIndex];

    if (tileValue === 0 || ( color.hex === tileValue )) return;

    dispatch( tools.setColor({
      hex: "#" + tileValue
    }) );
  }
}

export const deleteMapGridCollection = firestore.deleteMapGridCollection;
export const setCurrentScene = actions.setCurrentScene;

// import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';
import * as firestore from './firestore';

import * as utils from './utils';
import * as mapGridUtils from 'lib/editor/map-grid-utils';
// import * as tilemapDataUtils from 'lib/editor/tilemap-data-utils';

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

export const storeMap = ({ sceneId }) => (dispatch, getState) => {
  dispatch( actions.storeMapRequest() );

  const state = getState();
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

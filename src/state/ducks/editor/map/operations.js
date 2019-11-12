import * as firestore from './firestore';
import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';

import {
  clearStore as clearHistoryStore
} from '../history';

import {
  initializeStore as initializeLayerStore,
  clearStore as clearLayerStore,

  getLayerSortOrder,
  getLayerPropertiesObject
} from '../layers';

import {
  initializeStore as initializeTilemapStore,
  clearStore as clearTilemapStore,

  getTilemapDataObject,
  getSegmentPropertiesObject
} from '../tilemap';

import {
  // initializeStore as initializeToolStore,
  clearStore as clearToolStore,
} from '../tools';

import {
  setRequestStatus
} from '../requestStatus';

export const setCurrentScene = ({ uid }) => dispatch => {
  dispatch( setRequestStatus({ key: 'initializeMap', type: 'REQUEST' }) );
  dispatch( clearStore() );
  dispatch( actions.setCurrentScene({ uid }) );
}

export const clearStore = () => dispatch => {
  dispatch( clearTilemapStore() );
  dispatch( clearLayerStore() );
  dispatch( clearToolStore() );
  dispatch( clearHistoryStore() );
  dispatch( actions.clearMapGrid() );
  dispatch( actions.clearMapProperties() );
}

export const initializeMap = () => (dispatch, getState) => {
  const currentScene = selectors.getCurrentScene( getState() );
  if (!currentScene.uid) return;

  dispatch( setRequestStatus({ key: 'initializeMap', type: 'REQUEST' }) );

  return dispatch( firestore.getMapData({ uid: currentScene.uid }))

    // mapData
    .then(mapData => {
      const {
        mapProperties,
        layerSortOrder = [],
        layerProperties: layerPropertiesObject = {}
      } = mapData;

      return Promise.all([
        dispatch( actions.setMapProperties({ mapProperties }) ),
        dispatch( _handleLayersReducer({ layerSortOrder, layerPropertiesObject }) ),
        dispatch( _handleToolsReducer() ),
      ])
      .then(() => mapProperties);
    })

    // mapGrid
    .then(mapProperties => {
      return dispatch( firestore.getMapGrid({ uid: currentScene.uid }) )
        .then(mapGrid => (mapGrid)
          ? dispatch( actions.setMapGrid({ mapGrid }) )
          : dispatch( actions.setMapGrid({ mapGrid: utils.buildMapGrid({ mapSize: mapProperties.mapSize }) })
        ))
    })

    // tilemapData
    .then(() => dispatch( firestore.getTilemapData({ uid: currentScene.uid }) ))
    .then(tilemapDataObject => dispatch( _handleTilemapReducer({ tilemapDataObject }) ))

    // complete
    .then(() => {
      dispatch( setRequestStatus({ key: 'initializeMap', type: 'SUCCESS' }) );
    })
    .catch(e => {
      dispatch( setRequestStatus({ key: 'initializeMap', type: 'FAILURE', error: e }) );
      console.log(e);
    });
}

  const _handleLayersReducer = ({ layerSortOrder, layerPropertiesObject }) => dispatch => {
    return dispatch( initializeLayerStore({ layerSortOrder, layerPropertiesObject }) );
  }

  const _handleToolsReducer = () => dispatch => {
    // initialize tool settings -> not storing these yet
  }

  const _handleTilemapReducer = ({ tilemapDataObject }) => dispatch => {
    dispatch( initializeTilemapStore({ tilemapDataObject }) );
  }

export const storeMap = () => (dispatch, getState) => {
  dispatch( setRequestStatus({ key: 'storeMap', type: 'REQUEST' }) );

  const state = getState();
  const currentScene = selectors.getCurrentScene(state);
  const mapProperties = selectors.getMapProperties(state);
  const mapGrid = selectors.getMapGrid(state);
  const layerSortOrder = getLayerSortOrder(state)
  const layerProperties = getLayerPropertiesObject(state);
  const tilemapDataObject = getTilemapDataObject(state);
  const segmentProperties = getSegmentPropertiesObject(state);

  return Promise.all([
    dispatch( firestore.setMapData({ uid: currentScene.uid, mapProperties, layerSortOrder, layerProperties })),
    dispatch( firestore.setMapGrid({ uid: currentScene.uid, mapGrid })),
    dispatch( firestore.setTilemapData({ uid: currentScene.uid, tilemapDataObject, segmentProperties }))
  ])
  // complete
  .then(() => {
    dispatch( setRequestStatus({ key: 'storeMap', type: 'SUCCESS' }) )
  })
  .catch(e => {
    dispatch( setRequestStatus({ key: 'storeMap', type: 'FAILURE', error: e }) );
    console.log(e);
  });
}

export const deleteMap = ({ uid }) => dispatch => Promise.all([
  dispatch( firestore.clearMapGrid({ uid }) ),
  dispatch( firestore.clearTilemapData({ uid }) ),
]);

import * as firestore from './firestore';
import * as actions from './actions';
import * as selectors from './selectors';

import {
  initializeStore as initializeLayerStore,
  clearStore as clearLayerStore,

  getLayerSortOrder,
  getLayerPropertiesObject
} from '../layers';

import {
  initializeStore as initializeTilemapStore,
  clearStore as clearTilemapStore,
} from '../tilemap';

import {
  setRequestStatus
} from '../requestStatus';

export const setCurrentScene = ({ uid }) => dispatch => {
  return dispatch( clearStore() )
    .then(() => dispatch( actions.setCurrentScene({ uid }) ));
}

export const clearStore = () => dispatch => {
  return Promise.all([
    dispatch( clearTilemapStore() ),
    dispatch( clearLayerStore() ),
    dispatch( actions.clearMapGrid() ),
    dispatch( actions.clearMapProperties() )
  ])
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
        layerSortOrder = [], layerProperties: layerPropertiesObject = {}
      } = mapData;

      return Promise.all([
        dispatch( actions.setMapProperties({ mapProperties }) ),
        dispatch( _handleLayersReducer({ layerSortOrder, layerPropertiesObject }) ),
        dispatch( _handleToolsReducer() ),
      ]);
    })

    // mapGrid
    .then(() => dispatch( firestore.getMapGrid({ uid: currentScene.uid }) ))
    .then(mapGrid => {
      if (mapGrid) {
        return dispatch( actions.setMapGrid({ mapGrid }) );
      } else {
        // build map grid and dispatch
      }
    })

    // tilemapData
    .then(() => dispatch( firestore.getTilemapData({ uid: currentScene.uid }) ))
    .then(tilemapDataObject => dispatch( _handleTilemapReducer({ tilemapDataObject }) ))

    // complete
    .then(() => dispatch( setRequestStatus({ key: 'initializeMap', type: 'SUCCESS' }) ))
    .catch(e => {
      dispatch( setRequestStatus({ key: 'initializeMap', type: 'FAILURE', error: e }) );
      console.log(e);
    });
}

  const _handleLayersReducer = ({ layerSortOrder, layerPropertiesObject }) => dispatch => {
    console.log(1, '_editor/map/initialize/LAYERS');
    return dispatch( initializeLayerStore({ layerSortOrder, layerPropertiesObject }) );
  }

  const _handleToolsReducer = () => dispatch => {
    console.log(2, '_editor/map/initialize/TOOLS');
  }

  const _handleTilemapReducer = ({ tilemapDataObject }) => dispatch => {
    console.log(3, '_editor/map/initialize/TILEMAP');
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

  return Promise.all([
    dispatch( firestore.setMapData({ uid: currentScene.uid, mapProperties, layerSortOrder, layerProperties })),
    dispatch( firestore.setMapGrid({ uid: currentScene.uid, mapGrid })),
  ])
}

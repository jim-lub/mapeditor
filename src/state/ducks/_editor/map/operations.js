import * as firestore from './firestore';

import {
  initializeStore as initializeLayerStore,
  clearStore as clearLayerStore
} from '../layers';

import {
  setRequestStatus
} from '../requestStatus';

export const clearStore = () => dispatch => {
  return Promise.all([
    dispatch( clearLayerStore() )
  ])
}

export const initializeMap = ({ sceneId }) => dispatch => {
  if (!sceneId) return;
  dispatch( setRequestStatus({ key: 'initializeMap', type: 'REQUEST' }) );

  return dispatch( firestore.getMapData({ sceneId }))

    // mapData
    .then(mapData => {
      const { layerSortOrder = [], layerProperties: layerPropertiesObject = {} } = mapData;

      return Promise.all([
        dispatch( _handleLayersReducer({ layerSortOrder, layerPropertiesObject }) ),
        dispatch( _handleToolsReducer() ),
      ]);
    })

    // mapGrid
    .then(() => dispatch( firestore.getMapGrid({ sceneId }) ))
    .then(mapGrid => {
      return;
    })

    // tilemapData
    .then(() => dispatch( firestore.getTilemapData({ sceneId }) ))
    .then(tilemapData => {

      return Promise.all([
        dispatch( _handleTilemapReducer({ tilemapData }) ),
      ])
    })

    // complete
    .then(() => dispatch( setRequestStatus({ key: 'initializeMap', type: 'SUCCESS' }) ))
    .catch(e => {
      dispatch( setRequestStatus({ key: 'initializeMap', type: 'FAILURE', error: e }) );
      console.log(e);
    });
}

  const _handleLayersReducer = ({ layerSortOrder, layerPropertiesObject }) => dispatch => {
    console.log(1, '_editor/map/initialize/LAYERS');
    dispatch( initializeLayerStore({ layerSortOrder, layerPropertiesObject }) );
  }

  const _handleToolsReducer = () => dispatch => {
    console.log(2, '_editor/map/initialize/TOOLS');
  }

  const _handleTilemapReducer = ({ tilemapData }) => dispatch => {
    console.log(3, '_editor/map/initialize/TILEMAP');
  }

export const storeMap = () => dispatch => {

}

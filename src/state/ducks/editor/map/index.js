import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialStateProduction = {
  status: {},
  modified: false,

  mapProperties: {},
  mapGrid: [],
  layerProperties: {},
  layerSortOrder: [],
  segmentProperties: {},
  tilemapData: {}
}

const initialState = {
  status: {},
  mapProperties: {},
  mapGrid: [],

  layerSortOrder: ['layer-1'],
  // layerSortOrder: ['layer-1', 'layer-2', 'layer-3', 'layer-4'],
  layerProperties: {
    'layer-1': {
      type: 'layer/type/PAINT',
      tileSize: {
        width: 32,
        height: 32
      }
    },
    // 'layer-2': {
    //   tileSize: {
    //     width: 16,
    //     height: 16
    //   }
    // },
    // 'layer-3': {
    //   tileSize: {
    //     width: 8,
    //     height: 8
    //   }
    // },
    // 'layer-4': {
    //   tileSize: {
    //     width: 64,
    //     height: 64
    //   }
    // }
  },

  segmentProperties: {
    // 'segment-id': {
    //   modified: false
    // }
  },

  tilemapData: {}
}

export default createReducer( initialState )({
  [ types.initializeMapRequest ]: (state, action) => reducers.initializeMapRequest(state, action),
  [ types.initializeMapSuccess ]: (state, action) => reducers.initializeMapSuccess(state, action),
  [ types.initializeMapFailure ]: (state, action) => reducers.initializeMapFailure(state, action),

  [ types.initializeTilemapDataRequest ]: (state, action) => reducers.initializeTilemapDataRequest(state, action),
  [ types.initializeTilemapDataSuccess ]: (state, action) => reducers.initializeTilemapDataSuccess(state, action),
  [ types.initializeTilemapDataFailure ]: (state, action) => reducers.initializeTilemapDataFailure(state, action),

  [ types.storeMapRequest ]: (state, action) => reducers.storeMapRequest(state, action),
  [ types.storeMapSuccess ]: (state, action) => reducers.storeMapSuccess(state, action),
  [ types.storeMapFailure ]: (state, action) => reducers.storeMapFailure(state, action),

  [ types.setMapProperties ]: (state, action) => reducers.setMapProperties(state, action),
  [ types.setMapGrid ]: (state, action) => reducers.setMapGrid(state, action),

  [ types.setTilemapDataBySegmentId ]: (state, action) => reducers.setTilemapDataBySegmentId(state, action)
});

/*** operations ***/
export const initializeMap = operations.initializeMap;
export const storeMap = operations.storeMap;
export const validateTilemapDataBySegmentId = operations.validateTilemapDataBySegmentId;

/*** selectors ***/
export const getInitializeMapStatus = selectors.getInitializeMapStatus;
export const getStoreMapStatus = selectors.getStoreMapStatus;

export const getMapProperties = selectors.getMapProperties;
export const getMapGrid = selectors.getMapGrid;
export const getSegmentPropertiesById = selectors.getSegmentPropertiesById;

export const getLayerProperties = selectors.getLayerProperties;
export const getLayerPropertiesById = selectors.getLayerPropertiesById;
export const getLayerSortOrder = selectors.getLayerSortOrder;

export const getSegmentId = selectors.getSegmentId;
export const getTilemapDataBySegmentId = selectors.getTilemapDataBySegmentId;

import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  status: {},
  mapProperties: {},
  mapGrid: [],

  layerSortOrder: ['layer-1'],
  layerProperties: {
    'layer-1': {
      type: 'layer/type/PAINT',
      tileSize: {
        width: 32,
        height: 32
      }
    }
  },

  segmentProperties: {
    // 'segment-id': {
    //   modified: false
    // }
  },

  tilemapData: {
    // 'segment-id': {
    //   'layer-1': {
    //
    //   }
    // }
  }
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

  [ types.setTilemapDataObject ]: (state, action) => reducers.setTilemapDataObject(state, action)
});

/*** operations ***/
export const initializeMap = operations.initializeMap;
export const storeMap = operations.storeMap;
export const setTilemapDataObject = operations.setTilemapDataObject;

/*** selectors ***/
export const getInitializeMapStatus = selectors.getInitializeMapStatus;
export const getStoreMapStatus = selectors.getStoreMapStatus;

export const getMapProperties = selectors.getMapProperties;
export const getMapGrid = selectors.getMapGrid;

export const getSegmentId = selectors.getSegmentId;
export const getTilemapDataBySegmentId = selectors.getTilemapDataBySegmentId;

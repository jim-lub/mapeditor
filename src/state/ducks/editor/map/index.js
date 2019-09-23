import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

import * as layerTypes from 'lib/constants/layerTypes';

// const initialStateProduction = {
//   status: {},
//   modified: false,
//
//   mapProperties: {},
//   mapGrid: [],
//   activeLayerId: null,
//   layerProperties: {},
//   layerSortOrder: [],
//   segmentProperties: {},
//   tilemapData: {}
// }

const initialState = {
  status: {},
  mapProperties: {},
  mapGrid: [],
  activeLayerId: 'layer-1',
  layerSortOrder: ['layer-1'],
  // layerSortOrder: ['layer-1', 'layer-2', 'layer-3', 'layer-4'],
  layerProperties: {
    'layer-1': {
      type: layerTypes.color,
      tileSize: {
        width: 64,
        height: 64
      },
      visible: true
    },
    'layer-2': {
      type: layerTypes.color,
      tileSize: {
        width: 16,
        height: 16
      },
      visible: true
    },
    'layer-3': {
      type: layerTypes.color,
      tileSize: {
        width: 32,
        height: 32
      },
      visible: true
    },
    'layer-4': {
      type: layerTypes.color,
      tileSize: {
        width: 64,
        height: 64
      },
      visible: true
    }
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

  [ types.initializeTilemapDataBySegmentIdRequest ]: (state, action) => reducers.initializeTilemapDataBySegmentIdRequest(state, action),
  [ types.initializeTilemapDataBySegmentIdSuccess ]: (state, action) => reducers.initializeTilemapDataBySegmentIdSuccess(state, action),
  [ types.initializeTilemapDataBySegmentIdFailure ]: (state, action) => reducers.initializeTilemapDataBySegmentIdFailure(state, action),

  [ types.storeMapRequest ]: (state, action) => reducers.storeMapRequest(state, action),
  [ types.storeMapSuccess ]: (state, action) => reducers.storeMapSuccess(state, action),
  [ types.storeMapFailure ]: (state, action) => reducers.storeMapFailure(state, action),

  [ types.setMapProperties ]: (state, action) => reducers.setMapProperties(state, action),
  [ types.setMapGrid ]: (state, action) => reducers.setMapGrid(state, action),

  [ types.setTilemapDataBySegmentId ]: (state, action) => reducers.setTilemapDataBySegmentId(state, action),
  [ types.setSingleTileValue ]: (state, action) => reducers.setSingleTileValue(state, action),
  [ types.clearSingleTileValue ]: (state, action) => reducers.clearSingleTileValue(state, action),
});

/*** operations ***/
export const initializeMap = operations.initializeMap;
export const initializeTilemapDataBySegmentId = operations.initializeTilemapDataBySegmentId;
export const storeMap = operations.storeMap;

export const handleUserInput = operations.handleUserInput;

export const canvasController = operations.canvasController;
export const setSingleTileValue = operations.setSingleTileValue;
export const clearSingleTileValue = operations.clearSingleTileValue;

/*** selectors ***/
export const getInitializeMapStatus = selectors.getInitializeMapStatus;
export const getStoreMapStatus = selectors.getStoreMapStatus;
export const getDisableAllInput = selectors.getDisableAllInput;

export const getMapProperties = selectors.getMapProperties;
export const getMapGrid = selectors.getMapGrid;
export const getSegmentPropertiesById = selectors.getSegmentPropertiesById;

export const getActiveLayerId = selectors.getActiveLayerId;
export const getLayerProperties = selectors.getLayerProperties;
export const getLayerPropertiesById = selectors.getLayerPropertiesById;
export const getLayerSortOrder = selectors.getLayerSortOrder;

export const getSegmentId = selectors.getSegmentId;
export const getTilemapDataBySegmentId = selectors.getTilemapDataBySegmentId;

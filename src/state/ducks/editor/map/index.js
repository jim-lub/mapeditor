import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

import * as layerTypes from 'lib/constants/layerTypes';

const initialState = {
  status: {},
  statusMessage: {
    header: "",
    content: ""
  },

  currentScene: {
    uid: null,
    // uid: "5wQtFkKj9OktYR56bV7G",
    initialized: false,
    modified: false
  },

  meta: {
    createdLayers: {
      [layerTypes.color]: 1,
      [layerTypes.tileset]: 1,
      [layerTypes.collision]: 1,
    }
  },

  mapProperties: {},
  mapGrid: [],
  activeLayerId: null,
  layerProperties: {},
  layerSortOrder: [],
  segmentProperties: {},
  tilemapData: {}
}

export default createReducer( initialState )({
  [ types.initializeMapRequest ]: (state, action) => reducers.initializeMapRequest(state, action),
  [ types.initializeMapSuccess ]: (state, action) => reducers.initializeMapSuccess(state, action),
  [ types.initializeMapFailure ]: (state, action) => reducers.initializeMapFailure(state, action),

  [ types.initializeTilemapDataSegmentRequest ]: (state, action) => reducers.initializeTilemapDataSegmentRequest(state, action),
  [ types.initializeTilemapDataSegmentSuccess ]: (state, action) => reducers.initializeTilemapDataSegmentSuccess(state, action),
  [ types.initializeTilemapDataSegmentFailure ]: (state, action) => reducers.initializeTilemapDataSegmentFailure(state, action),

  [ types.storeMapRequest ]: (state, action) => reducers.storeMapRequest(state, action),
  [ types.storeMapSuccess ]: (state, action) => reducers.storeMapSuccess(state, action),
  [ types.storeMapFailure ]: (state, action) => reducers.storeMapFailure(state, action),

  [ types.setCurrentScene ]: (state, action) => reducers.setCurrentScene(state, action),
  [ types.setMapProperties ]: (state, action) => reducers.setMapProperties(state, action),
  [ types.setMapGrid ]: (state, action) => reducers.setMapGrid(state, action),

  [ types.setLayerPropertiesById ]: (state, action) => reducers.setLayerPropertiesById(state, action),
  [ types.deleteLayerPropertiesById ]: (state, action) => reducers.deleteLayerPropertiesById(state, action),
  [ types.setLayerSortOrder ]: (state, action) => reducers.setLayerSortOrder(state, action),
  [ types.setActiveLayer ]: (state, action) => reducers.setActiveLayer(state, action),
  [ types.toggleLayerVisibility ]: (state, action) => reducers.toggleLayerVisibility(state, action),

  [ types.setTilemapDataObject ]: (state, action) => reducers.setTilemapDataObject(state, action),
  [ types.addLayerToTilemapDataSegment ]: (state, action) => reducers.addLayerToTilemapDataSegment(state, action),
  [ types.removeLayerFromTilemapDataSegment ]: (state, action) => reducers.removeLayerFromTilemapDataSegment(state, action),

  [ types.setStatusMessage ]: (state, action) => reducers.setStatusMessage(state, action),

  [ types.setSingleTileValue ]: (state, action) => reducers.setSingleTileValue(state, action),
  [ types.clearSingleTileValue ]: (state, action) => reducers.clearSingleTileValue(state, action),
});

/*** operations ***/
export const initializeMap = operations.initializeMap;
export const initializeTilemapDataSegment = operations.initializeTilemapDataSegment;
export const validateTilemapDataSegment = operations.validateTilemapDataSegment;
export const storeMap = operations.storeMap;

export const handleUserInput = operations.handleUserInput;
export const handleCanvasUpdate = operations.handleCanvasUpdate;

export const setCurrentScene = operations.setCurrentScene;

export const createLayer = operations.createLayer;
export const deleteLayer = operations.deleteLayer;
export const updateLayerProperties = operations.updateLayerProperties;
export const updateLayerSortOrder = operations.updateLayerSortOrder;
export const setActiveLayer = operations.setActiveLayer;
export const toggleLayerVisibility = operations.toggleLayerVisibility;

export const deleteMapGridCollection = operations.deleteMapGridCollection;
export const deleteTilemapDataCollection = operations.deleteTilemapDataCollection;

/*** selectors ***/
export const getInitializeMapStatus = selectors.getInitializeMapStatus;
export const getStoreMapStatus = selectors.getStoreMapStatus;
export const getDisableAllInput = selectors.getDisableAllInput;

export const getCurrentScene = selectors.getCurrentScene;
export const getMapProperties = selectors.getMapProperties;
export const getMapGrid = selectors.getMapGrid;
export const getSegmentPropertiesById = selectors.getSegmentPropertiesById;
export const getStatusMessage = selectors.getStatusMessage;

export const getActiveLayerId = selectors.getActiveLayerId;
export const getLayerProperties = selectors.getLayerProperties;
export const getLayerPropertiesById = selectors.getLayerPropertiesById;
export const getLayerSortOrder = selectors.getLayerSortOrder;

export const getSegmentId = selectors.getSegmentId;
export const getTilemapData = selectors.getTilemapData;
export const getTilemapDataBySegmentId = selectors.getTilemapDataBySegmentId;

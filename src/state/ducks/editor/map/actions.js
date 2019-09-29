import * as types from './types';

export const initializeMapRequest = () => ({
  type: types.initializeMapRequest
});

export const initializeMapSuccess = () => ({
  type: types.initializeMapSuccess
});

export const initializeMapFailure = ({ error }) => ({
  type: types.initializeMapFailure,
  payload: {
    error
  }
});

export const initializeTilemapDataSegmentRequest = ({ segmentId }) => ({
  type: types.initializeTilemapDataSegmentRequest,
  payload: {
    segmentId
  }
});

export const initializeTilemapDataSegmentSuccess = ({ segmentId }) => ({
  type: types.initializeTilemapDataSegmentSuccess,
  payload: {
    segmentId
  }
});

export const initializeTilemapDataSegmentFailure = ({ error }) => ({
  type: types.initializeTilemapDataSegmentFailure,
  payload: {
    error
  }
});

export const storeMapRequest = () => ({
  type: types.storeMapRequest
});

export const storeMapSuccess = () => ({
  type: types.storeMapSuccess
});

export const storeMapFailure = ({ error }) => ({
  type: types.storeMapFailure,
  payload: {
    error
  }
});


export const setCurrentScene = ({ sceneId }) => ({
  type: types.setCurrentScene,
  payload: {
    sceneId
  }
});

export const setMapProperties = ({ mapProperties }) => ({
  type: types.setMapProperties,
  payload: {
    mapProperties
  }
});

export const setMapGrid = ({ mapGrid }) => ({
  type: types.setMapGrid,
  payload: {
    mapGrid
  }
});

export const setTilemapDataObject = ({ tilemapDataObject }) => ({
  type: types.setTilemapDataObject,
  payload: {
    tilemapDataObject
  }
});

export const addLayerToTilemapDataSegment = ({ segmentId, layerId, tilemapData }) => ({
  type: types.addLayerToTilemapDataSegment,
  payload: {
    segmentId,
    layerId,
    tilemapData
  }
});

export const removeLayerFromTilemapDataSegment = ({ segmentId, layerId }) => ({
  type: types.removeLayerFromTilemapDataSegment,
  payload: {
    segmentId,
    layerId
  }
});

export const setStatusMessage = ({ header = "", content = "" }) => ({
  type: types.setStatusMessage,
  payload: {
    header,
    content
  }
});

export const setSingleTileValue = ({ segmentId, layerId, columnIndex, rowIndex, value }) => ({
  type: types.setSingleTileValue,
  payload: {
    segmentId,
    layerId,
    columnIndex,
    rowIndex,
    value
  }
});

export const clearSingleTileValue = ({ segmentId, layerId, columnIndex, rowIndex }) => ({
  type: types.clearSingleTileValue,
  payload: {
    segmentId,
    layerId,
    columnIndex,
    rowIndex
  }
});

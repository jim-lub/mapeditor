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

export const initializeTilemapDataRequest = () => ({
  type: types.initializeTilemapDataRequest
});

export const initializeTilemapDataSuccess = () => ({
  type: types.initializeTilemapDataSuccess
});

export const initializeTilemapDataFailure = ({ error }) => ({
  type: types.initializeTilemapDataFailure,
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

export const setTilemapDataBySegmentId = ({ segmentId, tilemapData }) => ({
  type: types.setTilemapDataBySegmentId,
  payload: {
    segmentId,
    tilemapData
  }
});

export const deleteTilemapDataBySegmentId = ({ segmentId }) => ({
  type: types.deleteTilemapDataBySegmentId,
  payload: {
    segmentId
  }
});

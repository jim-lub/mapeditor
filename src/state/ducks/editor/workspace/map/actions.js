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

export const saveMapRequest = () => ({
  type: types.saveMapRequest
});

export const saveMapSuccess = () => ({
  type: types.saveMapSuccess
});

export const saveMapFailure = ({ error }) => ({
  type: types.saveMapFailure,
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

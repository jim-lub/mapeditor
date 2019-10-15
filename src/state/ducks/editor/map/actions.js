import * as types from './types';

export const setCurrentScene = ({ uid }) => ({
  type: types.setCurrentScene,
  payload: {
    uid
  }
});

export const setCurrentSceneProps = ({ initialized, modified }) => ({
  type: types.setCurrentSceneProps,
  payload: {
    initialized, modified
  }
});

export const clearCurrentScene = () => ({
  type: types.clearCurrentScene
});

export const setMapProperties = ({ mapProperties }) => ({
  type: types.setMapProperties,
  payload: {
    mapProperties
  }
});

export const clearMapProperties = () => ({
  type: types.clearMapProperties,
});

export const setMapGrid = ({ mapGrid }) => ({
  type: types.setMapGrid,
  payload: {
    mapGrid
  }
});

export const clearMapGrid = () => ({
  type: types.clearMapGrid
});

import * as types from './types';

export const setSceneCollectionRequest = () => ({
  type: types.setSceneCollectionRequest
});

export const setSceneCollectionSuccess = ({ sceneCollection, sceneSortOrder }) => ({
  type: types.setSceneCollectionSuccess,
  payload: {
    sceneCollection,
    sceneSortOrder
  }
});

export const setSceneCollectionFailure = error => ({
  type: types.setSceneCollectionFailure,
  payload: {
    error
  }
});

export const createSceneRequest = () => ({
  type: types.createSceneRequest
});

export const createSceneSuccess = ({ sceneId }) => ({
  type: types.createSceneSuccess,
  payload: {
    sceneId
  }
});

export const createSceneFailure = ({ error }) => ({
  type: types.createSceneFailure,
  payload: {
    error
  }
});

export const deleteSceneRequest = () => ({
  type: types.deleteSceneRequest
});

export const deleteSceneSuccess = () => ({
  type: types.deleteSceneSuccess,
});

export const deleteSceneFailure = ({ error }) => ({
  type: types.deleteSceneFailure,
  payload: {
    error
  }
});

export const updateSceneRequest = () => ({
  type: types.updateSceneRequest
});

export const updateSceneSuccess = () => ({
  type: types.updateSceneSuccess,
});

export const updateSceneFailure = ({ error }) => ({
  type: types.updateSceneFailure,
  payload: {
    error
  }
});

export const setActiveScene = ({ sceneId }) => ({
  type: types.setActiveScene,
  payload: {
    sceneId
  }
});

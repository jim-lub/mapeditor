import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  status: {
    setSceneCollection: { loading: false, error: null },
    createScene: { loading: false, error: null },
    deleteScene: { loading: false, error: null },
    updateScene: { loading: false, error: null },
  },

  sortOrder: [],
  collection: {},
  active: null
}

export default createReducer( initialState )({
  [ types.setSceneCollectionRequest ]: (state, action) => reducers.setSceneCollectionRequest(state, action),
  [ types.setSceneCollectionSuccess ]: (state, action) => reducers.setSceneCollectionSuccess(state, action),
  [ types.setSceneCollectionFailure ]: (state, action) => reducers.setSceneCollectionFailure(state, action),

  [ types.createSceneRequest ]: (state, action) => reducers.createSceneRequest(state, action),
  [ types.createSceneSuccess ]: (state, action) => reducers.createSceneSuccess(state, action),
  [ types.createSceneFailure ]: (state, action) => reducers.createSceneFailure(state, action),

  [ types.deleteSceneRequest ]: (state, action) => reducers.deleteSceneRequest(state, action),
  [ types.deleteSceneSuccess ]: (state, action) => reducers.deleteSceneSuccess(state, action),
  [ types.deleteSceneFailure ]: (state, action) => reducers.deleteSceneFailure(state, action),

  [ types.updateSceneRequest ]: (state, action) => reducers.updateSceneRequest(state, action),
  [ types.updateSceneSuccess ]: (state, action) => reducers.updateSceneSuccess(state, action),
  [ types.updateSceneFailure ]: (state, action) => reducers.updateSceneFailure(state, action),

  [ types.setActiveScene ]: (state, action) => reducers.setActiveScene(state, action),
});

/*** Operations ***/
export const listenToSceneChanges = ({ userId, projectId }) => operations.listenToSceneChanges({ userId, projectId });
export const createScene = ({ name, description }) => operations.createScene({ name, description });
export const deleteScene = ({ sceneId }) => operations.deleteScene({ sceneId });
export const updateScene = ({ sceneId, name, description }) => operations.updateScene({ sceneId, name, description });
export const setActiveScene = ({ sceneId }) => operations.setActiveScene({ sceneId });

/*** Selectors ***/
export const getSceneDataById = (state, sceneId) => selectors.getSceneDataById(state, sceneId);
export const getSceneCollection = state => selectors.getSceneCollection(state);
export const getSceneSortOrderByProjectId = (state, projectId) => selectors.getSceneSortOrderByProjectId(state, projectId);
export const getActiveSceneId = state => selectors.getActiveSceneId(state);

export const getSetSceneCollectionStatus = state => selectors.getSetSceneCollectionStatus(state);
export const getCreateSceneStatus = state => selectors.getCreateSceneStatus(state);
export const getDeleteSceneStatus = state => selectors.getDeleteSceneStatus(state);
export const getUpdateSceneStatus = state => selectors.getUpdateSceneStatus(state);

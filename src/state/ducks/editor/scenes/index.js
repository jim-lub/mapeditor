import * as types from './types';
import * as reducers from './reducers';
import * as selectors from './selectors';
import * as operations from './operations';

import { createReducer } from 'state/lib/utils';

const defaultState = {
  collection: [],
  active: null,
  initialized: false
}

export default createReducer( defaultState )({
  [ types.SET_SCENES_COLLECTION ]: ( state, action ) =>
    reducers.setScenesCollection(state, action),

  [ types.CLEAR_SCENES_COLLECTION ]: ( state, action ) =>
    reducers.clearScenesCollection(state, action),

  [ types.SET_ACTIVE_SCENE ]: ( state, action ) =>
    reducers.setActiveScene(state, action)
});


/*** OPERATIONS ***/
export const loadScenesCollection = ({ projectId }) =>
  operations.loadScenesCollection({ projectId });

export const terminateScenesCollection = () =>
  operations.terminateScenesCollection();

export const createScene = ({ userId, projectId, sceneName, sceneDesc }) =>
  operations.createScene({ userId, projectId, sceneName, sceneDesc });

export const deleteScene = ({ userId, projectId, sceneId }) =>
  operations.deleteScene({ userId, projectId, sceneId });

export const setActiveScene = ({ sceneId }) =>
  operations.setActiveScene({ sceneId });

/*** SELECTORS ***/
export const getScenesCollection = (state) =>
  selectors.getScenesCollection(state);

export const getActiveScene = (state) =>
  selectors.getActiveScene(state);

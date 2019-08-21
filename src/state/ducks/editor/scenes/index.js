import * as types from './types';
import * as operations from './operations';
import * as reducers from './reducers';
import * as selectors from './selectors';

import { createReducer } from 'state/lib/utils';

const defaultState = {
  collection: [],
  active: null,
  loading: false,
  error: null
}

export default createReducer( defaultState )({
  [ types.FETCH_SCENES_BEGIN ]: (state, action) =>
    reducers.fetchScenesBegin(state, action),

  [ types.FETCH_SCENES_SUCCESS ]: (state, action) =>
    reducers.fetchScenesSuccess(state, action),

  [ types.FETCH_SCENES_FAILURE ]: (state, action) =>
    reducers.fetchScenesFailure(state, action),

  [ types.SET_ACTIVE_SCENE ]: (state, action) =>
    reducers.setActiveScene(state, action),
});

/*** OPERATIONS ***/
export const fetchScenes = props => operations.fetchScenes(props);
export const createScene = props => operations.createScene(props);
export const deleteScene = props => operations.deleteScene(props);
export const deleteMultipleScenes = props => operations.deleteMultipleScenes(props);
export const setActiveScene = props => operations.setActiveScene(props);

/*** SELECTORS ***/
export const getScenes = state => selectors.getScenes(state);
export const getSceneIds = state => selectors.getSceneIds(state);
export const getSceneById = (state, uid) => selectors.getSceneById(state, uid);
export const getSceneFetchStatus = state => selectors.getSceneFetchStatus(state);
export const getActiveSceneId = state => selectors.getActiveSceneId(state);

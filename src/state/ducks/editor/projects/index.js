import * as types from './types';
import * as operations from './operations';
import * as reducers from './reducers';
import * as selectors from './selectors';

import { createReducer } from 'state/lib/utils';

const initialState = {
  collection: [],
  active: null,
  loading: false,
  error: null,
}

export default createReducer( initialState )({
  [ types.FETCH_PROJECTS_BEGIN ]: (state, action) =>
    reducers.fetchProjectsBegin(state, action),

  [ types.FETCH_PROJECTS_SUCCESS ]: (state, action) =>
    reducers.fetchProjectsSuccess(state, action),

  [ types.FETCH_PROJECTS_FAILURE ]: (state, action) =>
    reducers.fetchProjectsFailure(state, action),

  [ types.SET_ACTIVE_PROJECT ]: (state, action) =>
    reducers.setActiveProject(state, action),

  [ types.CLEAR_PROJECTS ]: ( state, action ) =>
    reducers.clearProjects(state, action),
});

/*** OPERATIONS ***/
export const fetchProjects = props => operations.fetchProjects(props);
export const createProject = props => operations.createProject(props);
export const deleteProject = props => operations.deleteProject(props);
export const setActiveProject = props => operations.setActiveProject(props);

/*** SELECTORS ***/
export const getProjects = state => selectors.getProjects(state);
export const getProjectIds = state => selectors.getProjectIds(state);
export const getProjectFetchStatus = state => selectors.getProjectFetchStatus(state);
export const getActiveProject = state => selectors.getActiveProject(state);
export const getActiveProjectId = state => selectors.getActiveProjectId(state);

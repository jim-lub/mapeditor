import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  status: {
    setProjectCollection: { loading: false, error: null },
    createProject: { loading: false, error: null },
    deleteProject: { loading: false, error: null },
    updateProject: { loading: false, error: null },
  },

  sortOrder: [],
  collection: {},
  active: null
}

/*** Reducer ***/
export default createReducer( initialState )({
  [ types.setProjectCollectionRequest ]: (state, action) => reducers.setProjectCollectionRequest(state, action),
  [ types.setProjectCollectionSuccess ]: (state, action) => reducers.setProjectCollectionSuccess(state, action),
  [ types.setProjectCollectionFailure ]: (state, action) => reducers.setProjectCollectionFailure(state, action),

  [ types.createProjectRequest ]: (state, action) => reducers.createProjectRequest(state, action),
  [ types.createProjectSuccess ]: (state, action) => reducers.createProjectSuccess(state, action),
  [ types.createProjectFailure ]: (state, action) => reducers.createProjectFailure(state, action),

  [ types.deleteProjectRequest ]: (state, action) => reducers.deleteProjectRequest(state, action),
  [ types.deleteProjectSuccess ]: (state, action) => reducers.deleteProjectSuccess(state, action),
  [ types.deleteProjectFailure ]: (state, action) => reducers.deleteProjectFailure(state, action),

  [ types.updateProjectRequest ]: (state, action) => reducers.updateProjectRequest(state, action),
  [ types.updateProjectSuccess ]: (state, action) => reducers.updateProjectSuccess(state, action),
  [ types.updateProjectFailure ]: (state, action) => reducers.updateProjectFailure(state, action),

  [ types.setActiveProject ]: (state, action) => reducers.setActiveProject(state, action),
});

/*** Operations ***/
export const listenToProjectChanges = ({ userId }) => operations.listenToProjectChanges({ userId });
export const createProject = ({ name, description }) => operations.createProject({ name, description });
export const deleteProject = ({ projectId }) => operations.deleteProject({ projectId });
export const updateProject = ({ projectId, name, description }) => operations.updateProject({ projectId, name, description });
export const setActiveProject = ({ projectId }) => operations.setActiveProject({ projectId });

/*** Selectors ***/
export const getProjectDataById = (state, projectId) => selectors.getProjectDataById(state, projectId);
export const getProjectCollection = state => selectors.getProjectCollection(state);
export const getProjectSortOrder = state => selectors.getProjectSortOrder(state);
export const getActiveProjectId = state => selectors.getActiveProjectId(state);

export const getSetProjectCollectionStatus = state => selectors.getSetProjectCollectionStatus(state);
export const getCreateProjectStatus = state => selectors.getCreateProjectStatus(state);
export const getDeleteProjectStatus = state => selectors.getDeleteProjectStatus(state);
export const getUpdateProjectStatus = state => selectors.getUpdateProjectStatus(state);

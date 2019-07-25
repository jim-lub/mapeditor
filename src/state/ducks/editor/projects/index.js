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
  [ types.SET_PROJECTS_COLLECTION ]: ( state, action ) =>
    reducers.setProjectsCollection(state, action),

  [ types.CLEAR_PROJECTS_COLLECTION ]: ( state, action ) =>
    reducers.clearProjectsCollection(state, action),

  [ types.SET_ACTIVE_PROJECT ]: ( state, action ) =>
    reducers.setActiveProject(state, action)
});


/*** OPERATIONS ***/
export const initializeProjectsCollection = ({ userId }) =>
  operations.initializeProjectsCollection({ userId });

export const terminateProjectsCollection = () =>
  operations.terminateProjectsCollection();

export const createProject = ({ userId, projectName, projectDesc }) =>
  operations.createProject({ userId, projectName, projectDesc });

export const deleteProject = ({ userId, projectId }) =>
  operations.deleteProject({ userId, projectId });

export const renameProject = ({ userId, projectId, projectName }) =>
  operations.renameProject({ userId, projectId, projectName });

export const setActiveProject = ({ projectId }) =>
  operations.setActiveProject({ projectId });

/*** SELECTORS ***/
export const getProjectsCollection = (state) =>
  selectors.getProjectsCollection(state);

export const getActiveProject = (state) =>
  selectors.getActiveProject(state);

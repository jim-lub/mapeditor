import * as types from './types';
import * as reducers from './reducers';
import * as selectors from './selectors';
import * as operations from './operations';

import { createReducer } from 'state/lib/utils';

const defaultState = {
  collection: [],
  initialized: false
}

export default createReducer( defaultState )({
  [ types.SET_PROJECTS_COLLECTION ]: ( state, action ) =>
    reducers.setProjectsCollection(state, action),

  [ types.CLEAR_PROJECTS_COLLECTION ]: ( state, action ) =>
    reducers.clearProjectsCollection(state, action),
});


/*** OPERATIONS ***/
export const initializeProjectsCollection = ({ userId }) =>
  operations.initializeProjectsCollection({ userId });

export const terminateProjectsCollection = () =>
  operations.terminateProjectsCollection();

export const insertProject = ({ userId, projectName, ProjectDesc }) =>
  operations.insertProject({ userId, projectName, ProjectDesc });

export const deleteProject = ({ userId, projectId }) =>
  operations.deleteProject({ userId, projectId });

export const renameProject = ({ userId, projectId, projectName }) =>
  operations.renameProject({ userId, projectId, projectName });

/*** SELECTORS ***/

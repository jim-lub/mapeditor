import * as types from './types';

export const setProjectCollectionRequest = () => ({
  type: types.setProjectCollectionRequest
});

export const setProjectCollectionSuccess = ({ projectCollection }) => ({
  type: types.setProjectCollectionSuccess,
  payload: {
    projectCollection
  }
});

export const setProjectCollectionFailure = error => ({
  type: types.setProjectCollectionFailure,
  payload: {
    error
  }
});

export const createProjectRequest = () => ({
  type: types.createProjectRequest
});

export const createProjectSuccess = ({ projectId }) => ({
  type: types.createProjectSuccess,
  payload: {
    projectId
  }
});

export const createProjectFailure = ({ error }) => ({
  type: types.createProjectFailure,
  payload: {
    error
  }
});

export const deleteProjectRequest = () => ({
  type: types.deleteProjectRequest
});

export const deleteProjectSuccess = () => ({
  type: types.deleteProjectSuccess,
});

export const deleteProjectFailure = ({ error }) => ({
  type: types.deleteProjectFailure,
  payload: {
    error
  }
});

export const updateProjectRequest = () => ({
  type: types.updateProjectRequest
});

export const updateProjectSuccess = () => ({
  type: types.updateProjectSuccess,
});

export const updateProjectFailure = ({ error }) => ({
  type: types.updateProjectFailure,
  payload: {
    error
  }
});

export const setActiveProject = ({ projectId }) => ({
  type: types.setActiveProject,
  payload: {
    projectId
  }
});

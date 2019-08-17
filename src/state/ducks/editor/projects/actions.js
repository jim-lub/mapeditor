import * as types from './types';

export const fetchProjectsBegin = () => ({
  type: types.FETCH_PROJECTS_BEGIN,
});

export const fetchProjectsSuccess = ({ projects }) => ({
  type: types.FETCH_PROJECTS_SUCCESS,
  payload: {
    projects
  }
});

export const fetchProjectsFailure = ({ error }) => ({
  type: types.FETCH_PROJECTS_FAILURE,
  payload: {
    error
  }
});

export const setActiveProject = ({ projectId }) => ({
  type: types.SET_ACTIVE_PROJECT,
  payload: {
    projectId
  }
});

export const clearProjects = () => ({
  type: types.CLEAR_PROJECTS
});

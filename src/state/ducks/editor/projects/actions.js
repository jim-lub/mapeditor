import * as types from './types';

export const setProjectsCollection = ({ collection = [] }) => {
  return {
    type: types.SET_PROJECTS_COLLECTION,
    payload: {
      collection
    }
  }
}

export const clearProjectsCollection = () => {
  return {
    type: types.CLEAR_PROJECTS_COLLECTION
  }
}

export const setActiveProject = ({ projectId }) => {
  return {
    type: types.SET_ACTIVE_PROJECT,
    payload: {
      projectId
    }
  }
}

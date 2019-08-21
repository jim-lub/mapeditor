import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';
import { fetchProjectsByOwnerId } from './utils';

import { getScenes, deleteMultipleScenes } from 'state/ducks/editor/scenes';

export const fetchProjects = ({ sortBy, sortOrder } = {}) => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  dispatch(
    actions.fetchProjectsBegin()
  );

  return fetchProjectsByOwnerId({ userId, sortBy, sortOrder })
    .then(projects => {
      dispatch( actions.fetchProjectsSuccess({ projects }) );
    })
    .catch(e => {
      dispatch( actions.fetchProjectsFailure({ error: 'error/LOADING_PROJECTS_FAILED' }) );
    });
};

export const createProject = ({ name, description }) => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  firebase.projects()
    .add({
        ownerId: userId,
        createdAt: firebase.serverTimestamp,
        name,
        description
    })
    .then(ref => {
      dispatch( setActiveProject({ projectId : ref.id }) );
      dispatch( fetchProjects() );
    })
    .catch(e => console.error(e));
};

export const deleteProjectAndChildScenes = ({ projectId }) => (dispatch, getState) => {
  // fetch scenes where projectId matches and map uids to array
  const sceneIds = getScenes(getState())
    .filter(data => data.projectId === projectId)
    .map(data => data.uid);

  if (sceneIds.length > 0) {
    dispatch( deleteMultipleScenes({ sceneIds }) )
      .then(() => {
        dispatch( _deleteProject({ projectId }));
      })
      .catch(e => console.error(e));
  } else {
    dispatch( _deleteProject({ projectId}) );
  }
};

export const _deleteProject = ({ projectId }) => (dispatch, getState) => {
  const activeProjectId = selectors.getActiveProjectId( getState() );

  firebase.project(projectId)
    .delete()
    .then(() => {
      if (activeProjectId === projectId) {
        dispatch( setActiveProject({ projectId: null }) );
      }

      dispatch( fetchProjects() );
    })
};

export const setActiveProject = ({ projectId }) => dispatch => {
  dispatch(
    actions.setActiveProject({ projectId })
  );
};

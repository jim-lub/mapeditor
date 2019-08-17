import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import { fetchProjectsByOwnerId } from './utils';

export const fetchProjects = ({ sortBy, sortOrder } = { sortBy: 'createdAt', sortOrder: 'desc'}) => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  dispatch(
    actions.fetchProjectsBegin()
  );

  return fetchProjectsByOwnerId({ userId, sortBy, sortOrder })
    .then(projects => {
      dispatch(
        actions.fetchProjectsSuccess({ projects })
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchProjectsFailure({ error: 'error/LOADING_PROJECTS_FAILED' })
      );
      console.error(e);
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
    .then(() => {
      dispatch(
        fetchProjects()
      );
    })
    .catch(e => console.error(e));
};

export const deleteProject = ({ projectId }) => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  firebase.project(projectId)
    .get()
    .then(doc => {

      if (doc.data().ownerId === userId) {
        return doc.id;
      } else {
        Promise.reject('error/match/AUTH_ID,!==,OWNER_ID');
      }

    })
    .then(projectId => {

      firebase.project(projectId)
        .delete()
        .then(() => {
          dispatch(
            fetchProjects()
          );
        })
        .catch(e => console.log(e));

    })
    .catch(e => console.log(e));
};

export const setActiveProject = ({ projectId }) => (dispatch, getState) => {
  dispatch(
    actions.setActiveProject({ projectId })
  );
};

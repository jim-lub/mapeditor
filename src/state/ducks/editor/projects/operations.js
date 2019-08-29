import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  deleteScene
} from 'state/ducks/editor/scenes';

export const listenToProjectChanges = ({ userId }) => (dispatch, getState) => {
  if (!userId) return null;

  return firebase.projects()
    .where("ownerId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.setProjectCollectionRequest() );

      const projectCollection = [];

      snapshot.forEach(doc => {
        const { name, description, createdAt } = doc.data();

        projectCollection.push({
          uid: doc.id,
          name: name,
          description: description,
          createdAt: createdAt
        });
      });

      try {
        dispatch( actions.setProjectCollectionSuccess({ projectCollection }) );
      } catch (error) {
        dispatch( actions.setProjectCollectionFailure({ error }) );
      }
    });
};

export const createProject = ({ name, description }) => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  dispatch( actions.createProjectRequest() );

  firebase.projects()
    .add({
      ownerId: userId,
      createdAt: firebase.serverTimestamp,
      name: name,
      description: description
    })
    .then(ref => {
      dispatch( actions.createProjectSuccess({ projectId: ref.id }) );
    })
    .catch(error => {
      dispatch( actions.createProjectFailure({ error }) );
    })
};

export const deleteProject = ({ projectId }) => (dispatch, getState) => {
  const currentState = getState();
  const { uid: userId } = currentState.auth.authUser;
  const activeProjectId = selectors.getActiveProjectId( currentState );

  dispatch( actions.deleteProjectRequest() );

  dispatch( _deleteChildScenes({ userId, projectId }) )
    .then(() => {
      firebase.project(projectId)
        .delete()
        .then(() => {
          if (projectId === activeProjectId) {
            dispatch( setActiveProject({ projectId: null }));
          }

          dispatch( actions.deleteProjectSuccess() );
        })
        .catch(() => {
          dispatch( actions.deleteProjectFailure() );
        });
    });
};

const _deleteChildScenes = ({ userId, projectId }) => dispatch => {
  return firebase.scenes()
    .where("ownerId", "==", userId)
    .where("projectId", "==", projectId)
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => firebase.scene(doc.id).delete())
    )
};

export const updateProject = ({ projectId, name, description }) => (dispatch) => {
  console.log('Update project: ' + projectId);
};

export const setActiveProject = actions.setActiveProject;

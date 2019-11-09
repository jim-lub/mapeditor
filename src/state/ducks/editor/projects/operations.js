import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';

import { deleteScene } from 'state/ducks/editor/scenes';
import { setCurrentScene, getCurrentScene } from 'state/ducks/editor/map';

export const listenToProjectChanges = ({ userId }) => (dispatch, getState) => {
  if (!userId) return () => null;

  return firebase.projects()
    .where("ownerId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.setProjectCollectionRequest() );

      const projectCollection = [];

      snapshot.forEach(doc => {
        const { name, description, createdAt, modifiedAt } = doc.data();

        projectCollection.push({
          uid: doc.id,
          name,
          description,
          createdAt: (createdAt) ? createdAt.toDate() : null,
          modifiedAt: (modifiedAt) ? modifiedAt.toDate() : null,
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
      modifiedAt: firebase.serverTimestamp,
      name,
      description
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

const _deleteChildScenes = ({ userId, projectId }) => (dispatch, getState) => {
  const currentScene = getCurrentScene( getState() );

  return firebase.scenes()
    .where("ownerId", "==", userId)
    .where("projectId", "==", projectId)
    .get()
    .then(querySnapshot => {
      return Promise.all(
        querySnapshot.docs.map(doc => {
          if (doc.id === currentScene.uid) {
            dispatch( setCurrentScene({ uid: null }) );
          }
          return dispatch( deleteScene({ sceneId: doc.id }) )
        })
      )
    });
};

export const updateProject = ({ projectId, name, description }) => (dispatch) => {
  dispatch ( actions.updateProjectRequest() );

  firebase.project(projectId)
    .update({
      name,
      description,
      modifiedAt: firebase.serverTimestamp,
    })
    .then(() => {
      dispatch( actions.updateProjectSuccess() );
    })
    .catch(error => {
      dispatch( actions.updateProjectFailure({ error }) );
    });
};

export const setActiveProject = actions.setActiveProject;

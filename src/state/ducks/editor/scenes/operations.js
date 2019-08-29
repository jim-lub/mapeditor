import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  getActiveProjectId
} from 'state/ducks/editor/projects';

export const listenToSceneChanges = ({ userId, projectId }) => (dispatch, getState) => {
  if (!userId) return () => null;
  if (!projectId) return () => null;
  console.log(projectId)

  return firebase.scenes()
    .where("ownerId", "==", userId)
    .where("projectId", "==", projectId)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.setSceneCollectionRequest() );

      const sceneCollection = [];

      snapshot.forEach(doc => {
        const { projectId, name, description, createdAt } = doc.data();

        sceneCollection.push({
          uid: doc.id,
          projectId,
          name,
          description,
          createdAt
        });
      });

      try {
        dispatch( actions.setSceneCollectionSuccess({ sceneCollection }) );
      } catch (error) {
        dispatch( actions.setSceneCollectionFailure({ error }) );
      }
    });
};

export const createScene = ({ name, description }) => (dispatch, getState) => {
  const currentState = getState();
  const { uid: userId } = currentState.auth.authUser;
  const projectId = getActiveProjectId( currentState );
  console.log(userId, projectId)

  dispatch( actions.createSceneRequest() );

  firebase.scenes()
    .add({
      ownerId: userId,
      projectId,
      createdAt: firebase.serverTimestamp,
      name,
      description
    })
    .then(sceneRef => {
      dispatch( actions.createSceneSuccess({ sceneId: sceneRef.id }) );
    })
    .catch(error => {
      dispatch( actions.createSceneFailure({ error }) );
    })
};

export const deleteScene = ({ sceneId }) => (dispatch, getState) => {
  const activeSceneId = selectors.getActiveSceneId( getState() );

  dispatch( actions.deleteSceneRequest() );

  firebase.scene(sceneId)
    .delete()
    .then(() => {
      if (sceneId === activeSceneId) {
        dispatch( setActiveScene({ sceneId: null }));
      }

      dispatch( actions.deleteSceneSuccess() );
    })
    .catch(() => {
      dispatch( actions.deleteSceneFailure() );
    });
};

export const updateScene = ({ sceneId, name, description }) => (dispatch) => {
  console.log('Update scene: ' + sceneId);
};

export const setActiveScene = actions.setActiveScene;

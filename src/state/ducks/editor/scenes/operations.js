import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';

import {
  getActiveProjectId
} from 'state/ducks/editor/projects';

export const listenToSceneChanges = ({ userId }) => (dispatch, getState) => {
  if (!userId) return () => null;

  return firebase.scenes()
    .where("ownerId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.setSceneCollectionRequest() );

      const sceneCollection = {};
      const sceneSortOrder = {};

      snapshot.forEach(doc => {
        // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        // console.log(source, " data: ", doc.data());

        const { projectId, name, description, createdAt } = doc.data();

        sceneCollection[doc.id] = {
          uid: doc.id,
          projectId,
          name,
          description,
          createdAt: (createdAt) ? createdAt.toDate() : null
        }

        if ( sceneSortOrder.hasOwnProperty(projectId) ) {
          if ( sceneSortOrder.hasOwnProperty(doc.id) ) {
            sceneSortOrder[projectId].push(doc.id);
          } else {
            sceneSortOrder[projectId].push(doc.id);
          }
        } else {
          sceneSortOrder[projectId] = [doc.id];
        }

      });

      try {
        dispatch( actions.setSceneCollectionSuccess({ sceneCollection, sceneSortOrder }) );
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

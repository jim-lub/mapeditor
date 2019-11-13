import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';

import { getActiveProjectId } from 'state/ducks/editor/projects';
import {
  setCurrentScene,
  deleteMap
} from 'state/ducks/editor/map';

export const listenToSceneChanges = ({ userId }) => (dispatch, getState) => {
  if (!userId) return () => null;

  return firebase.scenes()
    .where("ownerId", "==", userId)
    .orderBy("modifiedAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.setSceneCollectionRequest() );

      const sceneCollection = {};
      const sceneSortOrder = {};

      snapshot.forEach(doc => {
        // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        // console.log(source, " data: ", doc.data());

        const { projectId, name, description, createdAt, modifiedAt } = doc.data();

        sceneCollection[doc.id] = {
          uid: doc.id,
          projectId,
          name,
          description,
          createdAt: (createdAt) ? createdAt.toDate() : null,
          modifiedAt: (modifiedAt) ? modifiedAt.toDate() : null,
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

export const createScene = ({ name, description, mapProperties }) => (dispatch, getState) => {
  const currentState = getState();
  const { uid: userId } = currentState.auth.authUser;
  const projectId = getActiveProjectId( currentState );

  dispatch( actions.createSceneRequest() );

  firebase.scenes()
    .add({
      ownerId: userId,
      projectId,
      createdAt: firebase.serverTimestamp,
      modifiedAt: firebase.serverTimestamp,
      name,
      description,
      mapProperties: {
        mapSize: mapProperties.mapSize,
        segmentSize: mapProperties.segmentSize,
        allowedTileSizes: mapProperties.allowedTileSizes
      }
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


  Promise.all([
    dispatch( deleteMap({ uid: sceneId }) ),
  ])
    .then(() => {
      dispatch( setCurrentScene({ uid: null }) )
      return firebase.scene(sceneId)
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
    })
};

export const updateScene = ({ sceneId, name, description }) => (dispatch) => {
  dispatch ( actions.updateSceneRequest() );

  firebase.scene(sceneId)
    .update({
      name,
      description,
      modifiedAt: firebase.serverTimestamp,
    })
    .then(() => {
      dispatch( actions.updateSceneSuccess() );
    })
    .catch(error => {
      dispatch( actions.updateSceneFailure({ error }) );
    });
};

export const setActiveScene = actions.setActiveScene;

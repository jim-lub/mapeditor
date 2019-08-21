import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';
import { fetchScenesByProjectId } from './utils';

import { getProjectIds, getActiveProjectId } from 'state/ducks/editor/projects';

export const fetchScenes = ({ sortBy, sortOrder } = {}) => (dispatch, getState) => {
  dispatch(
    actions.fetchScenesBegin()
  );

  const projectIds = getProjectIds(getState());

  const scenes = projectIds
    .map(projectId => fetchScenesByProjectId({ projectId, sortBy, sortOrder }));

  Promise.all(scenes)
    .then(scenes => scenes.filter(arr => arr.length > 0))
    .then(scenes => {
      dispatch(
        actions.fetchScenesSuccess({ scenes })
      );
    })
    .catch(e => {
      dispatch(
        actions.fetchScenesFailure({ error: 'error/LOADING_SCENES_FAILED' })
      );
      console.error(e);
    });
};

export const createScene = ({ name, description }) => (dispatch, getState) => {
  const activeProjectId = getActiveProjectId(getState());

  if (!activeProjectId) return Promise.reject('error/NO_ACTIVE_PROJECT_ID_FOUND');

  firebase.scenes()
    .add({
      projectId: activeProjectId,
      createdAt: firebase.serverTimestamp,
      name,
      description
    })
    .then(ref => {
      dispatch( setActiveScene({ sceneId : ref.id }) );
      dispatch( fetchScenes() );
    })
    .catch(e => console.error(e));
};

export const deleteScene = ({ sceneId }) => (dispatch, getState) => {
  const activeSceneId = selectors.getActiveSceneId( getState() );

  firebase.scene(sceneId)
    .delete()
    .then(() => {
      if (activeSceneId === sceneId) {
        dispatch( setActiveScene({ sceneId: null }) );
      }

      dispatch( fetchScenes() );
    })
    .catch(e => console.error(e));
};

export const deleteMultipleScenes = ({ sceneIds }) => (dispatch, getState) => {
  const activeSceneId = selectors.getActiveSceneId( getState() );
  let resetActiveSceneId = false;

  const deleteScenes = sceneIds.map(sceneId => {
    if (activeSceneId === sceneId) {
      resetActiveSceneId = true;
    }

    return firebase.scene(sceneId).delete();
  });

  return Promise.all(deleteScenes)
    .then(() => {
      if (resetActiveSceneId) {
        dispatch( setActiveScene({ sceneId: null }) );
      }

      dispatch( fetchScenes() );
    });
};

export const setActiveScene = ({ sceneId }) => (dispatch, getState) => {
  dispatch(
    actions.setActiveScene({ sceneId })
  )
};

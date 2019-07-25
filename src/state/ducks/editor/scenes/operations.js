import { firebase } from 'state/lib/firebase';

import { getScenesCollectionByProjectId } from './utils';

import * as actions from './actions';

export const loadScenesCollection = ({ projectId }) => (dispatch) => {
  return getScenesCollectionByProjectId({ projectId })
    .then(collection => {
      dispatch(
        actions.setScenesCollection({ collection })
      )
    })
    .catch(e => console.error(e));
}

export const terminateScenesCollection = () => (dispatch) => {
  dispatch(actions.clearScenesCollection());
}

export const createScene = ({ userId, projectId, sceneName, sceneDesc }) => (dispatch) => {
  firebase.scenes()
    .add({
      project: {
        id: projectId
      },
      name: sceneName,
      description: sceneDesc
    })
    .then(() => getScenesCollectionByProjectId({ projectId }))
    .then(collection => {
      dispatch(
        actions.setScenesCollection({ collection })
      );
    })
    .catch(e => console.error(e));
}

export const deleteScene = ({ userId, projectId, sceneId }) => (dispatch) => {
  firebase.scenes().doc(sceneId)
    .delete()
    .then(() => getScenesCollectionByProjectId({ projectId }))
    .then(collection => {
      dispatch(
        actions.setScenesCollection({ collection })
      );
    })
    .catch(e => console.error(e));
}

export const renameScene = () => (dispatch) => {

}

export const setActiveScene = ({ sceneId }) => (dispatch) => {
  dispatch(
    actions.setActiveScene({ sceneId })
  )
}

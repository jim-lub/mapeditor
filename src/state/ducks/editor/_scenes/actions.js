import * as types from './types';

export const fetchScenesBegin = () => ({
  type: types.FETCH_SCENES_BEGIN,
});

export const fetchScenesSuccess = ({ scenes }) => ({
  type: types.FETCH_SCENES_SUCCESS,
  payload: {
    scenes
  }
});

export const fetchScenesFailure = ({ error }) => ({
  type: types.FETCH_SCENES_FAILURE,
  payload: {
    error
  }
});

export const setActiveScene = ({ sceneId }) => ({
  type: types.SET_ACTIVE_SCENE,
  payload: {
    sceneId
  }
});

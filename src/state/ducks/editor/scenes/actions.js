import * as types from './types';

export const setScenesCollection = ({ collection = [] }) => {
  return {
    type: types.SET_SCENES_COLLECTION,
    payload: {
      collection
    }
  }
}

export const clearScenesCollection = () => {
  return {
    type: types.CLEAR_SCENES_COLLECTION
  }
}

export const setActiveScene = ({ sceneId }) => {
  return {
    type: types.SET_ACTIVE_SCENE,
    payload: {
      sceneId
    }
  }
}

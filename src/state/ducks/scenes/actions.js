import * as types from './types';

export const setScenes = ({ scenes }) => ({
  type: types.setScenes,
  payload: { scenes }
});

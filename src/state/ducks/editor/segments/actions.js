import * as types from './types';

export const initializeStore = ({ tilemapDataObject }) => ({
  type: types.initializeStore,
  payload: { tilemapDataObject }
});

export const clearStore = () => ({
  type: types.clearStore
});

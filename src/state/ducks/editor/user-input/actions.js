import * as types from './types';

export const setPattern = ({ layerType, grid, list }) => ({
  type: types.setPattern,
  payload: {
    layerType,
    grid,
    list,
  }
});

export const clearPattern = () => ({
  type: types.clearPattern
});

import * as types from './types';

export const setActiveTool = ({ toolType }) => ({
  type: types.setActiveTool,
  payload: {
    toolType
  }
});

export const setColor = ({ hex }) => ({
  type: types.setColor,
  payload: {
    hex
  }
});

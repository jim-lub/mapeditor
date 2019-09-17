import * as types from './types';

export const setActiveTool = ({ toolType }) => ({
  type: types.setActiveTool,
  payload: {
    toolType
  }
});

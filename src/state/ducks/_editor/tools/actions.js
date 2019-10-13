import * as types from './types';

export const setCurrentTool = ({ toolType }) => ({
  type: types.setCurrentTool,
  payload: {
    toolType
  }
});

export const setColorValue = ({ hex = "", rgb = {}, hsl = {} }) => ({
  type: types.setColorValue,
  payload: {
    hex,
    rgb,
    hsl
  }
});

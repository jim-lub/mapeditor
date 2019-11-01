import * as types from './types';

export const setCurrentTool = ({ toolType }) => ({
  type: types.setCurrentTool,
  payload: {
    toolType
  }
});

export const setZoomScaleModifier = ({ value }) => ({
  type: types.setZoomScaleModifier,
  payload: {
    value
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

export const setTileValue = ({ columnIndex, rowIndex }) => ({
  type: types.setTileValue,
  payload: {
    columnIndex,
    rowIndex
  }
});

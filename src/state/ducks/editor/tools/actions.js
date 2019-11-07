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

export const setTileSelection = ({ grid, list }) => ({
  type: types.setTileSelection,
  payload: {
    grid,
    list
  }
});

export const clearTileSelection = () => ({
  type: types.clearTileSelection
});

import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  currentTool: null,
  zoomScaleModifier: {},
  colorValue: {
    hex: "#39ADD6"
  },
  tileSelection: {
    grid: [],
    list: []
  }
}

export default createReducer( initialState )({
  [ types.setCurrentTool ]: (state, action) => reducers.setCurrentTool(state, action),
  [ types.setZoomScaleModifier ]: (state, action) => reducers.setZoomScaleModifier(state, action),
  [ types.setColorValue ]: (state, action) => reducers.setColorValue(state, action),
  [ types.setTileSelection ]: (state, action) => reducers.setTileSelection(state, action),
  [ types.clearTileSelection ]: (state, action) => reducers.clearTileSelection(state, action),
});

/*** operations ***/
export const setCurrentTool = operations.setCurrentTool;
export const zoomIn = operations.zoomIn;
export const zoomOut = operations.zoomOut;
export const resetZoom = operations.resetZoom;
export const setColorValue = operations.setColorValue;
export const setTileSelection = operations.setTileSelection;
export const clearTileSelection = operations.clearTileSelection;

/*** selectors ***/
export const getCurrentTool = selectors.getCurrentTool;
export const getZoomScaleModifier = selectors.getZoomScaleModifier;
export const getColorValue = selectors.getColorValue;
export const getTileSelection = selectors.getTileSelection;
export const getTileSelectionGrid = selectors.getTileSelectionGrid;
export const getTileSelectionList = selectors.getTileSelectionList;

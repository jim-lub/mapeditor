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
  }
}

export default createReducer( initialState )({
  [ types.setCurrentTool ]: (state, action) => reducers.setCurrentTool(state, action),
  [ types.setZoomScaleModifier ]: (state, action) => reducers.setZoomScaleModifier(state, action),
  [ types.setColorValue ]: (state, action) => reducers.setColorValue(state, action),
});

/*** operations ***/
export const clearStore = operations.clearStore;
export const setCurrentTool = operations.setCurrentTool;
export const zoomIn = operations.zoomIn;
export const zoomOut = operations.zoomOut;
export const resetZoom = operations.resetZoom;
export const setColorValue = operations.setColorValue;

/*** selectors ***/
export const getCurrentTool = selectors.getCurrentTool;
export const getZoomScaleModifier = selectors.getZoomScaleModifier;
export const getColorValue = selectors.getColorValue;

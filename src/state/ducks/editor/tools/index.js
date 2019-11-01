import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  currentTool: null,
  zoomScaleModifier: 1,
  colorValue: {
    hex: "#39ADD6"
  },
  tileValue: [1, 1]
}

export default createReducer( initialState )({
  [ types.setCurrentTool ]: (state, action) => reducers.setCurrentTool(state, action),
  [ types.setZoomScaleModifier ]: (state, action) => reducers.setZoomScaleModifier(state, action),
  [ types.setColorValue ]: (state, action) => reducers.setColorValue(state, action),
  [ types.setTileValue ]: (state, action) => reducers.setTileValue(state, action),
});

/*** operations ***/
export const setCurrentTool = operations.setCurrentTool;
export const zoomIn = operations.zoomIn;
export const zoomOut = operations.zoomOut;
export const resetZoom = operations.resetZoom;
export const setColorValue = operations.setColorValue;
export const setTileValue = operations.setTileValue;

/*** selectors ***/
export const getCurrentTool = selectors.getCurrentTool;
export const getZoomScaleModifier = selectors.getZoomScaleModifier;
export const getColorValue = selectors.getColorValue;
export const getTileValue = selectors.getTileValue;

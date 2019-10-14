import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  segmentProperties: {},
  tilemapDataObject: {}
}

export default createReducer( initialState )({
  [ types.setTilemapDataObject ]: (state, action) => reducers.setTilemapDataObject(state, action),
  [ types.clearTilemapDataObject ]: (state, action) => reducers.clearTilemapDataObject(state, action),

  [ types.setTilemapDataSegment ]: (state, action) => reducers.setTilemapDataSegment(state, action),
  [ types.clearTilemapDataSegment ]: (state, action) => reducers.clearTilemapDataSegment(state, action),

  [ types.addLayerToTilemapDataSegment ]: (state, action) => reducers.addLayerToTilemapDataSegment(state, action),
  [ types.removeLayerFromTilemapDataSegment ]: (state, action) => reducers.removeLayerFromTilemapDataSegment(state, action),

  [ types.setSingleTileValue ]: (state, action) => reducers.setSingleTileValue(state, action),
  [ types.clearSingleTileValue ]: (state, action) => reducers.clearSingleTileValue(state, action),
});

/*** operations ***/
export const initializeStore = operations.initializeStore;
export const clearStore = operations.clearStore;

export const handleUserInput = operations.handleUserInput;
export const handleCanvasUpdate = operations.handleCanvasUpdate;

export const validateTilemapDataSegment = operations.validateTilemapDataSegment;

/*** selectors ***/
export const getTilemapDataSegmentbyId = selectors.getTilemapDataSegmentById;
export const getTilemapDataObject = selectors.getTilemapDataObject;

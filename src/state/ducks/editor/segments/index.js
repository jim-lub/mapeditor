import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  properties: {},
  tilemapData: {}
}

export default createReducer( initialState )({
  [ types.initializeStore ]: (state, action) => reducers.initializeStore(state, action),
  [ types.clearStore ]: (state, action) => reducers.clearStore(state, action),

  [ types.setTilemapData ]: (state, action) => reducers.setTilemapData(state, action),
  [ types.clearTilemapData ]: (state, action) => reducers.clearTilemapData(state, action),
});

/*** operations ***/
export const listenToTaskWorkerEvents = operations.listenToTaskWorkerEvents;

export const initializeStore = operations.initializeStore;
export const clearStore = operations.clearStore;

export const validateSegment = operations.validateSegment;

/*** selectors ***/
export const getTilemapData = selectors.getTilemapData;
export const getTilemapDataObject = selectors.getTilemapDataObject;
export const getPropertiesObject = selectors.getPropertiesObject;

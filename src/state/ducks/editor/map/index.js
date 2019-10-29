import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  currentScene: {
    // uid: "qYOFnxf8E88wbT7mlrnm",
    uid: "QVTmWKKpAuMMzGGMQTlx"
  },
  mapProperties: {},
  mapGrid: []
}

export default createReducer( initialState )({
  [ types.setCurrentScene ]: (state, action) => reducers.setCurrentScene(state, action),
  [ types.setCurrentSceneProps ]: (state, action) => reducers.setCurrentSceneProps(state, action),
  [ types.clearCurrentScene ]: (state, action) => reducers.clearCurrentScene(state, action),

  [ types.setMapProperties ]: (state, action) => reducers.setMapProperties(state, action),
  [ types.clearMapProperties ]: (state, action) => reducers.clearMapProperties(state, action),

  [ types.setMapGrid ]: (state, action) => reducers.setMapGrid(state, action),
  [ types.clearMapGrid ]: (state, action) => reducers.clearMapGrid(state, action),
});

/*** operations ***/
export const setCurrentScene = operations.setCurrentScene;

export const initializeMap = operations.initializeMap;
export const storeMap = operations.storeMap;
export const deleteMap = operations.deleteMap;

/*** selectors ***/
export const getCurrentScene = selectors.getCurrentScene;
export const getMapProperties = selectors.getMapProperties;
export const getMapGrid = selectors.getMapGrid;
export const getSegmentId = selectors.getSegmentId;

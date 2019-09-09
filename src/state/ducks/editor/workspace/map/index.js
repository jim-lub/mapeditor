import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  status: {
    initializeMap: { loading: false, error: null },
  },
  mapProperties: {},
  mapGrid: [],
}

export default createReducer( initialState )({
  [ types.initializeMapRequest ]: (state, action) => reducers.initializeMapRequest(state, action),
  [ types.initializeMapSuccess ]: (state, action) => reducers.initializeMapSuccess(state, action),
  [ types.initializeMapFailure ]: (state, action) => reducers.initializeMapFailure(state, action),

  [ types.saveMapRequest ]: (state, action) => reducers.saveMapRequest(state, action),
  [ types.saveMapSuccess ]: (state, action) => reducers.saveMapSuccess(state, action),
  [ types.saveMapFailure ]: (state, action) => reducers.saveMapFailure(state, action),

  [ types.setMapProperties ]: (state, action) => reducers.setMapProperties(state, action),
  [ types.setMapGrid ]: (state, action) => reducers.setMapGrid(state, action),
});

/*** operations ***/
export const loadScene = operations.loadScene;
export const saveScene = operations.saveScene;

/*** selectors ***/
export const getInitializeMapStatus = selectors.getInitializeMapStatus;
export const getSaveMapStatus = selectors.getSaveMapStatus;

export const getMapProperties = selectors.getMapProperties;
export const getMapGrid = selectors.getMapGrid;

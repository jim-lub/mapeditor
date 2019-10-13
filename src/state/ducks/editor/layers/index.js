import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  layerProperties: {},
  layerSortOrder: [],
  activeLayerId: null
}

export default createReducer( initialState )({
  [ types.setActiveLayerId ]: (state, action) => reducers.setActiveLayerId(state, action),
  [ types.clearActiveLayerId ]: (state, action) => reducers.clearActiveLayerId(state, action),

  [ types.setLayerSortOrder ]: (state, action) => reducers.setLayerSortOrder(state, action),
  [ types.clearLayerSortOrder ]: (state, action) => reducers.clearLayerSortOrder(state, action),

  [ types.setLayerPropertiesById ]: (state, action) => reducers.setLayerPropertiesById(state, action),
  [ types.clearLayerPropertiesById ]: (state, action) => reducers.clearLayerPropertiesById(state, action),

  [ types.clearAllLayerProperties ]: (state, action) => reducers.clearAllLayerProperties(state, action),
});

/*** operations ***/
export const initializeStore = operations.initializeStore;
export const clearStore = operations.clearStore;
export const createLayer = operations.createLayer;
export const deleteLayer = operations.deleteLayer;
export const updateLayer = operations.updateLayer;
export const moveLayer = operations.moveLayer;
export const toggleLayerVisibility = operations.toggleLayerVisibility;
export const toggleLayerLock = operations.toggleLayerLock;
export const setActiveLayerId = operations.setActiveLayerId;

/*** selectors ***/
export const getActiveLayerId = selectors.getActiveLayerId;
export const getLayerSortOrder = selectors.getLayerSortOrder;
export const getLayerPropertiesById = selectors.getLayerPropertiesById;
export const getLayerPropertiesObject = selectors.getLayerPropertiesObject;

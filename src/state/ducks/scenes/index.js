import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  scenes: {}
}

export default createReducer( initialState )({
  [ types.setScenes ]: (state, action) => reducers.setScenes(state, action),
});

/*** operations ***/
export const listenToSceneChanges = operations.listenToSceneChanges;
export const createScene = operations.createScene;

/*** selectors ***/
export const getScenes = selectors.getScenes;

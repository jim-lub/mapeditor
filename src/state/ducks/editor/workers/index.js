import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  process: true,
  tasks: []
}

export default createReducer( initialState )({
  [ types.addTask ]: (state, action) => reducers.addTask(state, action),
  [ types.removeTask ]: (state, action) => reducers.removeTask(state, action),
});

/*** operations ***/
export const controller = operations.controller;
export const addTask = operations.addTask;

/*** selectors ***/

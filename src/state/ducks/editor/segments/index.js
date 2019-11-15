import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  properties: {},
  tilemap: {}
}

export default createReducer( initialState )({

});

/*** operations ***/
export const listenToTaskWorkerEvents = operations.listenToTaskWorkerEvents;
export const addTaskToWorker = operations.addTaskToWorker;

/*** selectors ***/

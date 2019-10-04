import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  status: {}
}

export default createReducer( initialState )({
  [ types.setRequestStatus ]: (state, action) => reducers.setRequestStatus(state, action),
  [ types.clearRequestStatus ]: (state, action) => reducers.clearRequestStatus(state, action),
});

export const setRequestStatus = operations.setRequestStatus;
export const clearRequestStatus = operations.clearRequestStatus;
export const getRequestStatus = selectors.getRequestStatus;

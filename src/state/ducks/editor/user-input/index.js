import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
// import * as selectors from './selectors';
import * as reducers from './reducers';
import * as utils from './utils';

// import * as layerTypes from 'lib/constants/layerTypes';
// import * as toolTypes from 'lib/constants/toolTypes';

const initialState = {
  pattern: {
    layerType: null,
    grid: [],
    list: []
  }
}

export default createReducer( initialState )({
  [ types.setPattern ]: (state, action) => reducers.setPattern(state, action),
  [ types.clearPattern ]: (state, action) => reducers.clearPattern(state, action),
});

/*** operations ***/
export const handleUserInput = operations.handleUserInput;
export const createPattern = operations.createPattern;

/*** selectors ***/

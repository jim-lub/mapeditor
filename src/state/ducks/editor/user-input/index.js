import { createReducer } from 'state/lib/utils';

// import * as types from './types';
// import * as operations from './operations';
// import * as selectors from './selectors';
// import * as reducers from './reducers';
import * as utils from './utils';

import * as toolTypes from 'lib/constants/toolTypes';

const initialState = {
  patterns: {
    default: {
      grid: [],
      list: []
    }
  }
}

export default createReducer( initialState )({

});

/*** operations ***/
export const testUserInput = ({ selection, size, value }) => dispatch => {
  utils.createPattern({ size, value })
}

/*** selectors ***/

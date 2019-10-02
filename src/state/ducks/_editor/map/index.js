import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  currentScene: {},
  mapProperties: {},
  mapGrid: []
}

export default createReducer( initialState )({

})

import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  segmentProperties: {},
  tilemapDataSegment: {}
}

export default createReducer( initialState )({

})

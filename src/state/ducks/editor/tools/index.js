import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

import * as toolTypes from 'lib/constants/toolTypes';

const initialState = {
  active: toolTypes.paintBrush,

  colorValue: {
    hex: "#22194D"
  },

  properties: {
    size: {
      width: 1,
      height: 1
    },
    pattern: []
  }
}

export default createReducer( initialState )({
  [ types.setActiveTool ]: (state, action) => reducers.setActiveTool(state, action),
  [ types.setColor ]: (state, action) => reducers.setColor(state, action),
});

/*** operations ***/
export const setActiveTool = operations.setActiveTool;
export const setColor = operations.setColor;

/*** selectors ***/
export const getActiveTool = selectors.getActiveTool;
export const getColor = selectors.getColor;

import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  data: {}
}

export default createReducer( initialState )({
  [ types.newForm ]: (state, action) => reducers.newForm(state, action),
  [ types.updateForm ]: (state, action) => reducers.updateForm(state, action),
  [ types.deleteForm ]: (state, action) => reducers.deleteForm(state, action),
});

/*** operations ***/
export const initializeForm = operations.initializeForm;
export const validateForm = operations.validateForm;

/*** selectors ***/
export const getPendingStatus = selectors.getPendingStatus;
export const getFormData = selectors.getFormData;

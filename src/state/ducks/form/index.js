import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  collection: {

  }
}

export default createReducer( initialState )({
  [ types.newForm ]: (state, action) => reducers.newForm(state, action),
  [ types.setValue ]: (state, action) => reducers.setValue(state, action),
});

/*** operations ***/
export const initializeForm = operations.initializeForm;
export const validateForm = operations.validateForm;
export const clearForm = operations.clearForm;
export const updateValue = operations.updateValue;

/*** selectors ***/
export const getFormData = selectors.getFormData;

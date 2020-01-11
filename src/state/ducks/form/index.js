import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {}

export default createReducer( initialState )({
  [ types.newForm ]: (state, action) => reducers.newForm(state, action),
  [ types.setFormValid ]: (state, action) => reducers.setFormValid(state, action),

  [ types.setFieldErrors ]: (state, action) => reducers.setFieldErrors(state, action),
  [ types.setFieldTouched ]: (state, action) => reducers.setFieldTouched(state, action),
  [ types.setFieldValue ]: (state, action) => reducers.setFieldValue(state, action),
});

/*** operations ***/
export const initializeForm = operations.initializeForm;
export const validateForm = operations.validateForm;

export const setFieldTouched = operations.setFieldTouched;
export const updateFieldValue = operations.updateFieldValue;
export const validateFields = operations.validateFields;

/*** selectors ***/
export const getFormMeta = selectors.getFormMeta;
export const getFormState = selectors.getFormState;
export const getNormalizedFormState = selectors.getNormalizedFormState;

export const getFieldErrors = selectors.getFieldErrors;
export const getFieldLabel = selectors.getFieldLabel;
export const getFieldMeta = selectors.getFieldMeta;
export const getFieldPlaceholder = selectors.getFieldPlaceholder;
export const getFieldValue = selectors.getFieldValue;

export const getSelectOptions = selectors.getSelectOptions;

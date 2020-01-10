import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {

}

export default createReducer( initialState )({
  [ types.newForm ]: (state, action) => reducers.newForm(state, action),
  [ types.clearForm ]: (state, action) => reducers.clearForm(state, action),

  [ types.setFieldTouched ]: (state, action) => reducers.setFieldTouched(state, action),
  [ types.setFieldValue ]: (state, action) => reducers.setFieldValue(state, action),
  [ types.clearFieldValue ]: (state, action) => reducers.clearFieldValue(state, action),

  [ types.setFieldErrors ]: (state, action) => reducers.setFieldErrors(state, action),

  [ types.setFormDisableBoolean ]: (state, action) => reducers.setFormDisableBoolean(state, action),
  [ types.setStepIndex ]: (state, action) => reducers.setStepIndex(state, action),
});

/*** operations ***/
export const initializeForm = operations.initializeForm;

export const setFieldTouched = operations.setFieldTouched;
export const updateFieldValue = operations.updateFieldValue;


export const clearForm = operations.clearForm;
export const validateForm = operations.validateForm;
export const previousStep = operations.previousStep;
export const nextStep = operations.nextStep;

export const submitForm = operations.submitForm;

/*** selectors ***/
export const getFieldMeta = selectors.getFieldMeta;
export const getFieldPlaceholder = selectors.getFieldPlaceholder;
export const getFieldValue = selectors.getFieldValue;
export const getFormState = selectors.getFormState;


export const getFormData = selectors.getFormData;
export const getNormalizedFormData = selectors.getNormalizedFormData;
export const getFormStatus = selectors.getFormStatus;
export const getSteps = selectors.getSteps;
export const getStepIndex = selectors.getStepIndex;
export const getFieldNames = selectors.getFieldNames;
export const getFieldData = selectors.getFieldData;
export const getFieldErrors = selectors.getFieldErrors;

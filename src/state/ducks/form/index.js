import { createReducer } from 'state/lib/utils';

import * as types from './types';
import * as operations from './operations';
import * as selectors from './selectors';
import * as reducers from './reducers';

const initialState = {
  collection: {
    // 'new-map-form': {
    //   pending: false,
    //   disabled: true,
    //   type: 'multi',
    //   currentStep: 1,
    //   totalSteps: 5,
    //   steps: ['Map', 'Setup'],
    //   form: {
    //     'Map': {
    //
    //     }
    //   }
    // }
  }
}

export default createReducer( initialState )({
  [ types.newForm ]: (state, action) => reducers.newForm(state, action),
  [ types.clearForm ]: (state, action) => reducers.clearForm(state, action),

  [ types.setFieldValue ]: (state, action) => reducers.setFieldValue(state, action),
  [ types.clearFieldValue ]: (state, action) => reducers.clearFieldValue(state, action),

  [ types.setFieldErrors ]: (state, action) => reducers.setFieldErrors(state, action),

  [ types.setFormDisableBoolean ]: (state, action) => reducers.setFormDisableBoolean(state, action),
});

/*** operations ***/
export const initializeForm = operations.initializeForm;
export const clearForm = operations.clearForm;
export const validateForm = operations.validateForm;

export const updateFieldValue = operations.updateFieldValue;

export const previousStep = operations.previousStep;
export const nextStep = operations.nextStep;

export const submitForm = operations.submitForm;

/*** selectors ***/
export const getFormData = selectors.getFormData;
export const getFormStatus = selectors.getFormStatus;
export const getSteps = selectors.getSteps;
export const getStepIndex = selectors.getStepIndex;
export const getFieldNames = selectors.getFieldNames;
export const getFieldData = selectors.getFieldData;
export const getFieldValue = selectors.getFieldValue;
export const getFieldErrors = selectors.getFieldErrors;

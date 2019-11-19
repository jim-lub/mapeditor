import * as types from './types';

export const newForm = ({ id, schema }) => ({
  type: types.newForm,
  payload: { id, schema }
});

export const clearForm = ({ id }) => ({
  type: types.clearForm,
  payload: { id }
});

export const setValue = ({ id, currentStep, name, value }) => ({
  type: types.setValue,
  payload: { id, currentStep, name, value }
});

export const clearValue = ({ id, currentStep, name, value }) => ({
  type: types.clearValue,
  payload: { id, currentStep, name }
});

export const setError = ({ id, currentStep, name, error }) => ({
  type: types.setError,
  payload: { id, currentStep, name, error }
});

export const clearError = ({ id, currentStep, name }) => ({
  type: types.clearError,
  payload: { id, currentStep, name }
});

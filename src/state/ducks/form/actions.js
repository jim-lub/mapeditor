import * as types from './types';

export const newForm = ({ id, schema }) => ({
  type: types.newForm,
  payload: { id, schema }
});

export const clearForm = ({ id }) => ({
  type: types.clearForm,
  payload: { id }
});

export const setValue = ({ id, step, name, value }) => ({
  type: types.setValue,
  payload: { id, step, name, value }
});

export const clearValue = ({ id, step, name, value }) => ({
  type: types.clearValue,
  payload: { id, step, name }
});

export const setError = ({ id, step, name, type, message }) => ({
  type: types.setError,
  payload: { id, step, name, type, message }
});

export const clearError = ({ id, step, name, type }) => ({
  type: types.clearError,
  payload: { id, step, name, type }
});

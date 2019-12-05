import * as types from './types';

export const newForm = ({ id, data, steps }) => ({
  type: types.newForm,
  payload: { id, data, steps }
});

export const clearForm = ({ id }) => ({
  type: types.clearForm,
  payload: { id }
});

export const setFieldValue = ({ id, step, fieldName, fieldValue }) => ({
  type: types.setFieldValue,
  payload: { id, step, fieldName, fieldValue }
});

export const clearFieldValue = ({ id, step, fieldName }) => ({
  type: types.clearFieldValue,
  payload: { id, step, fieldName }
});

export const setFieldErrors = ({ id, step, fieldName, errors }) => ({
  type: types.setFieldErrors,
  payload: { id, step, fieldName, errors }
});

export const setFormDisableBoolean = ({ id }) => ({
  type: types.setFormDisableBoolean,
  payload: { id }
});

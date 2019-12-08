import * as types from './types';

export const newForm = ({ id, data, steps }) => ({
  type: types.newForm,
  payload: { id, data, steps }
});

export const clearForm = ({ id }) => ({
  type: types.clearForm,
  payload: { id }
});

export const setFieldValue = ({ id, stepName, fieldName, fieldValue }) => ({
  type: types.setFieldValue,
  payload: { id, stepName, fieldName, fieldValue }
});

export const clearFieldValue = ({ id, stepName, fieldName }) => ({
  type: types.clearFieldValue,
  payload: { id, stepName, fieldName }
});

export const setFieldErrors = ({ id, stepName, fieldName, errors }) => ({
  type: types.setFieldErrors,
  payload: { id, stepName, fieldName, errors }
});

export const setFormDisableBoolean = ({ id, boolean }) => ({
  type: types.setFormDisableBoolean,
  payload: { id, boolean }
});

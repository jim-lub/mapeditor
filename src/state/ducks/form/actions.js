import * as types from './types';

export const newForm = ({ uid, type, steps, fields }) => ({
  type: types.newForm,
  payload: { uid, type, steps, fields }
});

export const clearForm = ({ id }) => ({
  type: types.clearForm,
  payload: { id }
});

export const setFieldTouched = ({ uid, field }) => ({
  type: types.setFieldTouched,
  payload: { uid, field }
});

export const setFieldValue = ({ uid, field, value }) => ({
  type: types.setFieldValue,
  payload: { uid, field, value }
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

export const setStepIndex = ({ id, stepIndex }) => ({
  type: types.setStepIndex,
  payload: { id, stepIndex }
});

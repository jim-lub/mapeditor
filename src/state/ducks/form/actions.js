import * as types from './types';

export const newForm = ({ uid, type, steps, fields }) => ({
  type: types.newForm,
  payload: { uid, type, steps, fields }
});

export const setFormValid = ({ uid, valid }) => ({
  type: types.setFormValid,
  payload: { uid, valid }
})

export const setFieldErrors = ({ uid, field, valid, errors }) => ({
  type: types.setFieldErrors,
  payload: { uid, field, valid, errors }
});

export const setFieldTouched = ({ uid, field }) => ({
  type: types.setFieldTouched,
  payload: { uid, field }
});

export const setFieldValue = ({ uid, field, value }) => ({
  type: types.setFieldValue,
  payload: { uid, field, value }
});

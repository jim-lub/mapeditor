import * as types from './types';

export const newForm = ({ id, schema }) => ({
  type: types.newForm,
  payload: { id, schema }
});

export const updateForm = ({ id, currentStep, name, value }) => ({
  type: types.updateForm,
  payload: { id, currentStep, name, value }
});

export const deleteForm = ({ id }) => ({
  type: types.deleteForm,
  payload: { id }
});

export const getForm = (state, { id }) => state.form.collection[id];
export const getFormData = (state, { id }) => state.form.collection[id].data;

export const getFormStatus = (state, { id }) => ({
  pending: state.form.collection[id].pending,
  disabled: state.form.collection[id].disabled
});

export const getSteps = (state, { id }) => state.form.collection[id].steps;
export const getStepIndex = (state, { id }) => state.form.collection[id].stepIndex;
export const getFieldNames = (state, { id, stepName }) => Object.keys(state.form.collection[id].data[stepName]);
export const getFieldData = (state, { id, stepName, fieldName }) => state.form.collection[id].data[stepName][fieldName];
export const getFieldValue = (state, { id }) => state.form.collection[id];
export const getFieldErrors = (state, { id }) => state.form.collection[id];

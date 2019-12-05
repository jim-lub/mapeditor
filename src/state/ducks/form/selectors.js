export const getForm = (state, { id }) => state.form.collection[id];

export const getFormStatus = (state, { id }) => ({
  pending: state.form.collection[id].pending,
  disabled: state.form.collection[id].disabled
});

export const getStepNames = (state, { id }) => state.form.collection[id].steps;
export const getCurrentStep = (state, { id }) => state.form.collection[id].currentStep;
export const getTotalSteps = (state, { id }) => state.form.collection[id].totalSteps;
export const getFieldNames = (state, { id, stepName }) => Object.keys(state.form.collection[id].data[stepName]);
export const getFieldData = (state, { id, stepName, fieldName }) => state.form.collection[id].data[stepName][fieldName];
export const getFieldValue = (state, { id }) => state.form.collection[id];
export const getFieldErrors = (state, { id }) => state.form.collection[id];

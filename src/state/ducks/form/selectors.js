export const getFormData = (state, { id }) => state.form.collection.hasOwnProperty(id) ? state.form.collection[id].data : null;
export const getValidationRules = (state, { id, step, name }) => state.form.collection[id].data[step][name].validation;

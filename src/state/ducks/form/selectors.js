import * as fieldTypes from 'lib/constants/fieldTypes';

export const getForm = (state, { id }) => state.form.collection[id];
export const getFormData = (state, { id }) => state.form.collection[id].data;

export const getNormalizedFormData = (state, { id }) => {
  return Object.entries(state.form.collection[id].data).reduce((obj, [stepName, stepData], index) => {
    return obj = {
      ...obj,
      ...Object.entries(stepData).reduce((fieldsObj, [fieldName, fieldData], index) => {
        console.log(fieldData)
        switch (fieldData.fieldType) {

          case fieldTypes.text:
            return fieldsObj = {
              ...fieldsObj,
              [fieldName]: null
            }

          default:
            break;
        }

        return fieldsObj;
      }, {})
    }
  }, {});
}

export const getFormStatus = (state, { id }) => ({
  pending: state.form.collection[id].pending,
  disabled: state.form.collection[id].disabled
});

export const getSteps = (state, { id }) => state.form.collection[id].steps;
export const getStepIndex = (state, { id }) => state.form.collection[id].stepIndex;
export const getFieldNames = (state, { id, stepName }) => Object.keys(state.form.collection[id].data[stepName]);
export const getFieldData = (state, { id, stepName, fieldName }) => state.form.collection[id].data[stepName][fieldName];
export const getFieldValue = (state, { id, stepName, fieldName }) => state.form.collection[id];
export const getFieldErrors = (state, { id }) => state.form.collection[id];

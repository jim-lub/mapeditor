import * as fieldTypes from 'lib/constants/fieldTypes';

export const getFieldMeta = (state, { uid, field }) => state.form[uid].fields[field].meta;
export const getFieldPlaceholder = (state, { uid, field }) => state.form[uid].fields[field].placeholder;
export const getFieldValue = (state, { uid, field }) => state.form[uid].fields[field].value;
export const getFormState = (state, { uid }) => state.form[uid];





export const getForm = (state, { id }) => state.form[id];
export const getFormData = (state, { id }) => state.form[id].data;

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
  pending: state.form[id].pending,
  disabled: state.form[id].disabled
});

export const getSteps = (state, { id }) => state.form[id].steps;
export const getStepIndex = (state, { id }) => state.form[id].stepIndex;
export const getFieldNames = (state, { id, stepName }) => Object.keys(state.form[id].data[stepName]);
export const getFieldData = (state, { id, stepName, fieldName }) => state.form[id].data[stepName][fieldName];
export const getFieldErrors = (state, { id }) => state.form[id];

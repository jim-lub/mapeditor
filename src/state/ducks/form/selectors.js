import * as fieldTypes from 'lib/constants/fieldTypes';

export const getFormMeta = (state, { uid }) => (state.form.hasOwnProperty(uid)) ? state.form[uid].meta : null;
export const getFormState = (state, { uid }) => state.form[uid];

export const getNormalizedFormState = (state, { uid }) => {
  const getValue = ({ type, value = '' }) => {
      switch (type) {
        case fieldTypes.file:
          return value.file;

        case fieldTypes.select:
          return value.value;

        default:
          return value;
      }
  }

  if (state.form.hasOwnProperty(uid)) {
    return Object.entries(state.form[uid].fields).reduce((obj, [key, { type, value }]) => {
      return obj = {
        ...obj,
        [key]: getValue({ type, value })
      }
    }, {});
  }

  return {};
}

export const getFields = (state, { uid }) => state.form[uid].fields;
export const getFieldErrors = (state, { uid, field }) => state.form[uid].fields[field].errors;
export const getFieldLabel = (state, { uid, field }) => state.form[uid].fields[field].label;
export const getFieldMeta = (state, { uid, field }) => state.form[uid].fields[field].meta;
export const getFieldPlaceholder = (state, { uid, field }) => state.form[uid].fields[field].placeholder;
export const getFieldValue = (state, { uid, field }) => state.form[uid].fields[field].value;

export const getSelectOptions = (state, { uid, field }) => state.form[uid].fields[field].options;

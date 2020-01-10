// import * as fieldTypes from 'lib/constants/fieldTypes';

export const getFields = (state, { uid }) => state.form[uid].fields;
export const getFieldErrors = (state, { uid, field }) => state.form[uid].fields[field].errors;
export const getFieldLabel = (state, { uid, field }) => state.form[uid].fields[field].label;
export const getFieldMeta = (state, { uid, field }) => state.form[uid].fields[field].meta;
export const getFieldPlaceholder = (state, { uid, field }) => state.form[uid].fields[field].placeholder;
export const getFieldValue = (state, { uid, field }) => state.form[uid].fields[field].value;

export const getFormMeta = (state, { uid }) => (state.form.hasOwnProperty(uid)) ? state.form[uid].meta : null;
export const getFormState = (state, { uid }) => state.form[uid];

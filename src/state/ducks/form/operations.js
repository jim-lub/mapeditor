import * as actions from './actions';
import * as selectors from './selectors';
import * as validate from './validation';

import * as fieldTypes from 'lib/constants/fieldTypes';
import * as validationTypes from 'lib/constants/validationTypes';

export const initializeForm = ({ uid, schema: { type, steps, fields } }) => dispatch => {
  // validate schema here..
  dispatch( actions.newForm({ uid, type, steps, fields }) );
}

export const validateForm = ({ uid }) => (dispatch, getState) => {
  const state = getState();
  const fieldsArray = Object.values( selectors.getFields(state, { uid }) );

  const errors = fieldsArray.filter(({ errors }) => errors.length > 0);
  const valid = errors.length === 0;

  dispatch( actions.setFormValid({ uid, valid }) );
}

export const setFieldTouched = ({ uid, field }) => dispatch => {
  dispatch( actions.setFieldTouched({ uid, field }) );
}

export const updateFieldValue = ({ uid, field, value }) => dispatch => {
  dispatch( actions.setFieldValue({ uid, field, value }));
}

export const validateFields = ({ uid }) => (dispatch, getState) => {
  const state = getState();
  const fieldsArray = Object.entries( selectors.getFields(state, { uid }) );

  fieldsArray.forEach(([field, { type: fieldType, meta, ...rest }]) => {
    const errors = dispatch( _validateField({ uid, field, fieldType, ...rest }) );
    const valid = errors.length === 0;

    if (!valid || (valid !== meta.valid)) {
      dispatch( actions.setFieldErrors({ uid, field, valid, errors }) );
    };
  });
}

const _validateField = ({ uid, fieldType, value = '', validation = [], ...rest }) => (dispatch, getState) => {
  return validation.filter(({ matchField, type: validationType, ...rest }) => {
    const match = {};

    if (validationType === validationTypes.matches) {
      match.value = selectors.getFieldValue(getState(), { uid, field: matchField });
    }

    return _validator({ value, match, ...rest })[fieldType][validationType];
  });
}

const _validator = ({ value, match, ...rest }) => ({
  [ fieldTypes.text ]: {
    [ validationTypes.required ]: validate.required({ value, ...rest }),
    [ validationTypes.matches ]: validate.matches({ value, match, ...rest }),
    [ validationTypes.length ]: validate.length({ value, ...rest }),
  },

  [ fieldTypes.textarea ]: {
    [ validationTypes.required ]: validate.required({ value, ...rest }),
    [ validationTypes.matches ]: validate.matches({ value, match, ...rest }),
    [ validationTypes.length ]: validate.length({ value, ...rest }),
  },

  [ fieldTypes.number ]: {
    [ validationTypes.required ]: validate.required({ value, ...rest }),
    [ validationTypes.minValue ]: validate.minValue({ value, ...rest }),
    [ validationTypes.maxValue ]: validate.maxValue({ value, ...rest }),
  },

  [ fieldTypes.password ]: {
    [ validationTypes.required ]: validate.required({ value, ...rest }),
    [ validationTypes.matches ]: validate.matches({ value, match, ...rest }),
    [ validationTypes.length ]: validate.length({ value, ...rest }),
  },

  [ fieldTypes.select ]: {
    [ validationTypes.required ]: validate.required({ value, ...rest }),
  },

  [ fieldTypes.file ]: {

  }
});

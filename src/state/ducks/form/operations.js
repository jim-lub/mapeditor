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
  const meta = selectors.getFormMeta(state, { uid });

  const errors = fieldsArray.filter(({ errors }) => errors.length > 0);
  const valid = errors.length === 0;

  if (!valid || (valid !== meta.valid)) {
    dispatch( actions.setFormValid({ uid, valid }) );
  };
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
    const errors = dispatch( _validateField({ uid, fieldType, ...rest }) );
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

    return _validator[fieldType][validationType]({ value, match, ...rest });
  });
}

const _validator = ({
  [ fieldTypes.text ]: {
    [ validationTypes.required ]:
      ({ value, match, ...rest }) => validate.required({ value, ...rest }),
    [ validationTypes.matches ]:
      ({ value, match, ...rest }) => validate.matches({ value, match, ...rest }),
    [ validationTypes.length ]:
      ({ value, match, ...rest }) => validate.length({ value, ...rest }),
  },

  [ fieldTypes.textarea ]: {
    [ validationTypes.required ]:
      ({ value, match, ...rest }) => validate.required({ value, ...rest }),
    [ validationTypes.matches ]:
      ({ value, match, ...rest }) => validate.matches({ value, match, ...rest }),
    [ validationTypes.length ]:
      ({ value, match, ...rest }) => validate.length({ value, ...rest }),
  },

  [ fieldTypes.number ]: {
    [ validationTypes.required ]:
      ({ value, ...rest }) => validate.required({ value, ...rest }),
    [ validationTypes.minValue ]:
      ({ value, ...rest }) => validate.minValue({ value, ...rest }),
    [ validationTypes.maxValue ]:
      ({ value, ...rest }) => validate.maxValue({ value, ...rest }),
  },

  [ fieldTypes.password ]: {
    [ validationTypes.required ]:
      ({ value, ...rest }) => validate.required({ value, ...rest }),
    [ validationTypes.matches ]:
      ({ value, match, ...rest }) => validate.matches({ value, match, ...rest }),
    [ validationTypes.length ]:
      ({ value, ...rest }) => validate.length({ value, ...rest }),
  },

  [ fieldTypes.select ]: {
    [ validationTypes.required ]:
      ({ value, ...rest }) => validate.required({ value: (value.value) ? value.value : '', ...rest }),
  },

  [ fieldTypes.file ]: {
    // file validations
  }
});

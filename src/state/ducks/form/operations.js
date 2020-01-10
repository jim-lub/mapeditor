import * as actions from './actions';
import * as selectors from './selectors';
import * as validate from './validation';

import * as fieldTypes from 'lib/constants/fieldTypes';
import * as validationTypes from 'lib/constants/validationTypes';

export const initializeForm = ({ uid, schema: { type, steps, fields } }) => dispatch => {
  // validate schema here..
  dispatch( actions.newForm({ uid, type, steps, fields }) );
}

export const setFieldTouched = ({ uid, field }) => dispatch => {
  dispatch( actions.setFieldTouched({ uid, field }) );
}

export const updateFieldValue = ({ uid, field, value }) => dispatch => {
  dispatch( actions.setFieldValue({ uid, field, value }));
}

export const validateFields = ({ uid }) => (dispatch, getState) => {
  const fieldsArray = Object.entries({});

  fieldsArray.forEach(([field, { type, ...rest }]) => {
    switch(type) {
      case fieldTypes.text:
        return () => null;

      default:
        console.log('No type specified for field: ' + field)
        break;
    }
  });
}

const _validateText = () => {

}



export const clearForm = () => dispatch => null;
export const submitForm = () => dispatch => null;

export const validateForm = ({ id }) => (dispatch, getState) => {
  const state = getState();
  const formData = selectors.getFormData(state, { id });
  const steps = selectors.getSteps(state, { id });
  const stepIndex = selectors.getStepIndex(state, { id });
  const stepName = steps[stepIndex];
  let disableFormSubmit = false;

  Object.entries( formData[stepName] )
    .forEach(([fieldName, { value = '', validation = [] }]) => {

      const errors = validation.filter(({ type, ...rest }) => {
        switch (type) {
            case validationTypes.required:
              return dispatch(
                validate.required({ value })
              )
            case validationTypes.matches:
              return dispatch(
                validate.matches({ value, id, ...rest })
              )
            case validationTypes.minValue:
              return dispatch(
                validate.minValue({ value, ...rest })
              )
            case validationTypes.maxValue:
              return dispatch(
                validate.maxValue({ value, ...rest })
              )
            case validationTypes.length:
              return dispatch(
                validate.length({ value, ...rest })
              )
            case validationTypes.number:
              return dispatch(
                validate.number({ value, ...rest })
              )
            default: return null
        }
      });

      if (errors.length > 0) {
        disableFormSubmit = true;
      }

      dispatch( actions.setFieldErrors({
        id,
        stepName,
        fieldName,
        errors
      }) );
  });

  dispatch( actions.setFormDisableBoolean({
    id,
    boolean: disableFormSubmit
  }) );
}

export const previousStep = ({ id }) => (dispatch, getState) => {
  const state = getState();
  const stepIndex = selectors.getStepIndex(state, { id });

  if (stepIndex > 0) {
    return dispatch( actions.setStepIndex({ id, stepIndex: stepIndex - 1 }) );
  }
}

export const nextStep = ({ id }) => (dispatch, getState) => {
  const state = getState();
  const steps = selectors.getSteps(state, { id });
  const stepIndex = selectors.getStepIndex(state, { id });
  const { disabled } = selectors.getFormStatus(state, { id });

  if (!disabled && stepIndex < (steps.length - 1)) {
    return dispatch( actions.setStepIndex({ id, stepIndex: stepIndex + 1 }) );
  }
}

// export const updateFieldValue = actions.setFieldValue;

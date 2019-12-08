import * as actions from './actions';
import * as selectors from './selectors';

import validateFieldValue from './validation';

export const initializeForm = ({ id, schema }) => dispatch => {
  const steps = schema.map(({ stepName }) => stepName);

  const data = schema.reduce((obj, step, index) => {
    return {
      ...obj,
      [step.stepName]: {
        ...step.fields
      }
    }
  }, {})

  dispatch( actions.newForm({ id, data, steps }) );
}

export const clearForm = () => dispatch => {

}

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
        if (validateFieldValue.hasOwnProperty(type)) {
          return !validateFieldValue[type](value, { ...rest });
        }

        return false;
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

export const previousStep = () => dispatch => {

}

export const nextStep = () => dispatch => {

}

export const updateFieldValue = actions.setFieldValue;

export const submitForm = () => dispatch => {

}

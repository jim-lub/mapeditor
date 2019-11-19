import * as actions from './actions';
import * as selectors from './selectors';

export const initializeForm = ({ id, schema }) => dispatch => {
  const validatedSchema = dispatch( _validateSchema({ schema }) );

  dispatch( actions.newForm({ id, schema: validatedSchema }) );
}

const _validateSchema = ({ schema }) => (dispatch, getState) => {
  return Object.entries(schema).reduce((obj, [step, state]) => ({
    ...obj,
    [step]: {
      ...Object.entries(state).reduce((obj, [key, { value, ...rest }]) => {
        return obj = {
          ...obj,
          [key]: {
            ...rest,
            name: key,
            value: (value) ? value : ''
          }
        }
      }, {})
    }
  }), {});
}

export const validateForm = ({ id, name, value, currentStep }) => dispatch => {
  dispatch( actions.setValue({
    id,
    currentStep,
    name,
    value
  }));
}

export const submitForm = () => {

}

export const clearForm = () => {

}

export const updateValue = ({ id, step, name, value }) => (dispatch, getState) => {
  const state = getState();
  const validationRules = selectors.getValidationRules(state, { id, step, name });

  console.log(validationRules);

  dispatch( actions.setValue({
    id,
    step,
    name,
    value
  }));
}

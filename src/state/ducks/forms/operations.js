import * as actions from './actions';

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
  dispatch( actions.updateForm({
    id,
    currentStep,
    name,
    value
  }));
}

const _validateInput = () => {

}

export const submitForm = () => {

}

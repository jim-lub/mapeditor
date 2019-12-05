import * as actions from './actions';
import * as selectors from './selectors';

import validation from './validation';

/*
SINGLE STEP FORM OPERATIONS -----------------------------
- initializeSingleStepForm
- clearSingleStepForm
- validateSingleStepForm

MULTI STEP FORM OPERATIONS ------------------------------
- initializeMultiStepForm
- clearMultiStepForm
- previousStep
- nextStep
- validateMultiStepForm

GLOBAL OPERATIONS ---------------------------------------
- submitForm

ACTIONS -------------------------------------------------
- newForm
- clearForm
- setFormDisableBoolean
- setFieldValue
- clearFieldValue
- setFieldErrors

SELECTORS -----------------------------------------------
- getFormStatus ( initialized, disabled, pending )
- getCurrentStep ( return `null` for single step form )
- getTotalSteps ( return `null` for single step form )
- getFieldNamesByStepName
- getFieldData
- getFieldValue
- getFieldErrors
*/

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

export const validateForm = () => dispatch => {

}

export const previousStep = () => dispatch => {

}

export const nextStep = () => dispatch => {

}

export const updateFieldValue = () => dispatch => {

}

export const submitForm = () => dispatch => {

}

// export const initializeForm = ({ id, schema }) => dispatch => {
//   const validatedSchema = dispatch( _validateSchema({ schema }) );
//
//   dispatch( actions.newForm({ id, schema: validatedSchema }) );
// }
//
// const _validateSchema = ({ schema }) => (dispatch, getState) => {
//   return Object.entries(schema).reduce((obj, [step, state]) => ({
//     ...obj,
//     [step]: {
//       ...Object.entries(state).reduce((obj, [key, { value, ...rest }]) => {
//         return obj = {
//           ...obj,
//           [key]: {
//             ...rest,
//             name: key,
//             value: (value) ? value : ''
//           }
//         }
//       }, {})
//     }
//   }), {});
// }
//
// export const validateForm = ({ id, step }) => (dispatch, getState)=> {
//   const state = getState();
//   const formData = selectors.getFormData(state, { id })[step];
//
//   const errors = Object.entries(formData).filter(([fieldName, { name, value }]) => {
//     const validationRules = selectors.getValidationRules(state, { id, step, name });
//
//     if (validationRules) {
//       const fieldErrors = validationRules.filter(({ type, message, ...rest }) => {
//         if ((validation[type](value, { ...rest }))) {
//           dispatch( actions.setError({ id, step, name, type, message }) );
//           return true;
//         }
//
//         dispatch( actions.clearError({ id, step, name, type }) );
//         return false;
//       });
//
//       if (fieldErrors.length > 0) {
//         return true;
//       }
//
//       return false;
//     }
//   });
//
//   if (errors.length > 0) {
//     return dispatch( actions.disableFormSubmit({ id }) );
//   }
//   return dispatch( actions.enableFormSubmit({ id }) );
// }
//
// export const submitForm = () => {
//
// }
//
// export const clearForm = () => {
//
// }
//
// export const updateValue = ({ id, step, name, value }) => (dispatch, getState) => {
//   const state = getState();
//
//   dispatch( actions.setValue({ id, step, name, value }));
//
//   dispatch( validateForm({ id, step }) );
// }

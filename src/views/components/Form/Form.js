import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  initializeSingleStepForm,
  initializeMultiStepForm,

  validateSingleStepForm,
  validateMultiStepForm,

  previousStep,
  nextStep,

  updateFieldValue,
  submitForm,

  getFormStatus,
  getCurrentStep,
  getTotalSteps,
  getFieldNames,
  getFieldData,
  getFieldValue,
  getFieldErrors
} from 'state/ducks/form';

import { Loader } from 'views/components/Loader';

const Component = ({
  id = null,
  schema = {},
  components = [],
  children,

  pending = false,
  disabled = true,
  currentStep,
  totalSteps,
  actions
}) => {

  // useEffect(() => {
  //   actions.initializeForm({ id, schema });
  // //eslint-disable-next-line
  // }, []);
  //
  // const handleBlur = ({ name }) => {
  //   actions.validateForm({ id, name, step: currentStep });
  // }
  //
  // const handleChange = ({ name, value, validateWhileTyping }) => {
  // actions.updateValue({ id, name, value, step: currentStep })
  // }

  return <Loader.Simple />

  const handleClickPrevious = () => {
    if (currentStep > 1) {
      actions.previousStep();
    }
  }

  const handleClickNext = () => {
    if (currentStep < totalSteps) {
      actions.nextStep();
    }
  }

  if (!pending) {
    return <Loader.Simple />
  }

  // return (
  //   <>
  //     {
  //       children({
  //         Component: React.cloneElement(
  //           components[currentStep - 1],
  //           {
  //             state: {
  //               formData: formData[currentStep],
  //               onBlur: handleBlur,
  //               onChange: handleChange
  //             }
  //           }
  //         ),
  //         ButtonBack: React.cloneElement(
  //           <ButtonPrevious />,
  //           {
  //             text: (currentStep > 1) ? 'Back' : 'Cancel',
  //             onClick: handleClickPrevious
  //           }
  //         ),
  //         ButtonContinue: React.cloneElement(
  //           <ButtonNext />,
  //           {
  //             text: (currentStep < totalSteps) ? 'Next' : 'Submit',
  //             disabled: formDisabled,
  //             onClick: handleClickNext
  //           }
  //         ),
  //         currentStep,
  //         totalSteps: Object.keys(formData).length
  //       })
  //     }
  //   </>
  // )
}

const ButtonPrevious = ({ text = 'Cancel', disabled = false, onClick }) => {
  return (
    <button style={{minWidth: 100}} disabled={disabled} onClick={onClick}>{ text }</button>
  )
}

const ButtonNext = ({ text = 'Submit', disabled = true, onClick }) => {
  return (
    <button style={{minWidth: 100}} className={"blue"} disabled={disabled} onClick={onClick}>{ text }</button>
  )
}

const mapStateToProps = (state, { id }) => {
  const { pending, disabled } = getFormStatus(state, { id }) || {};
  const currentStep = getCurrentStep(state, { id })

  return {
    pending,
    disabled,
    currentStep,
    totalSteps: getTotalSteps(state, { id }),
    fieldNames: getFieldNames(state, { id, step: currentStep }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      initializeSingleStepForm,
      initializeMultiStepForm,
      validateSingleStepForm,
      validateMultiStepForm,
      previousStep,
      nextStep,
      updateFieldValue,
      submitForm
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import useDebouncedEffect from 'use-debounced-effect';

import {
  initializeForm,
  validateForm,

  previousStep,
  nextStep,

  updateFieldValue,
  submitForm,

  getFormData,
  getFormStatus,
  getSteps,
  getStepIndex
} from 'state/ducks/form';

import { Loader } from 'views/components/Loader';

const Component = ({
  id = null,
  schema = {},
  components = [],
  children,

  formData,
  pending = true,
  disabled = true,
  steps,
  stepIndex,
  actions
}) => {
  const [debouncedValidationRefresh, setDebouncedValidationRefresh] = useState(false);

  useEffect(() => {
    actions.initializeForm({ id, schema });
  }, [id, schema, actions]);

  // debounce validation while typing
  useDebouncedEffect(() => {
    actions.validateForm({ id })
  }, 150, [debouncedValidationRefresh])

  const handleBlur = () => actions.validateForm({ id });
  const handleChange = ({ name, value }) => {
    actions.updateFieldValue({
      id,
      stepName: steps[stepIndex],
      fieldName: name,
      fieldValue: value
    });

    setDebouncedValidationRefresh(!debouncedValidationRefresh)
  };

  const handlePrevious = () => null;
  const handleNext = () => null;

  const handleClickPrevious = () => {
    if (stepIndex > 0) {
      actions.previousStep();
    }
  }

  const handleClickNext = () => {
    if (stepIndex < (steps.length - 1)) {
      actions.nextStep();
    }
  }

  if (pending) {
    return <Loader.Simple />
  }

  return (
    <>
      {
        children({
          Component: React.cloneElement(
            components[stepIndex],
            {
              state: {
                formData: formData[ steps[stepIndex] ],
                onBlur: handleBlur,
                onChange: handleChange
              }
            }
          ),
          ButtonBack: React.cloneElement(
            <ButtonPrevious />,
            {
              text: (stepIndex > 0) ? 'Back' : 'Cancel',
              onClick: handleClickPrevious
            }
          ),
          ButtonContinue: React.cloneElement(
            <ButtonNext />,
            {
              text: (stepIndex < (steps.length - 1)) ? 'Next' : 'Submit',
              disabled,
              onClick: handleClickNext
            }
          ),
          currentStep: stepIndex + 1,
          totalSteps: steps.length
        })
      }
    </>
  )
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
  if (!state.form.collection.hasOwnProperty(id)) return {};

  const { pending, disabled } = getFormStatus(state, { id });
  const steps = getSteps(state, { id });
  const stepIndex = getStepIndex(state, { id });

  return {
    pending,
    disabled,
    steps,
    stepIndex,
    formData: getFormData(state, { id })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      initializeForm,
      validateForm,
      previousStep,
      nextStep,
      updateFieldValue,
      submitForm
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

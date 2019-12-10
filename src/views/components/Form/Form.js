import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  onSubmit,
  onCancel,
  children,

  formData,
  pending = true,
  disabled = true,
  steps = [],
  stepIndex = 0,
  actions
}) => {
  const [debouncedValidationRefresh, setDebouncedValidationRefresh] = useState(false);
  const isFirstStep = (stepIndex === 0);
  const isLastStep = (stepIndex === (steps.length - 1));

  useEffect(() => {
    actions.initializeForm({ id, schema });
  }, [id, schema, actions]);

  useEffect(() => {
    actions.validateForm({ id });
  }, [id, stepIndex, actions])

  // debounce validation while typing
  useDebouncedEffect(() => {
    actions.validateForm({ id });
  }, 200, [debouncedValidationRefresh]);

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

  const handlePrevious = () => {
    if (isFirstStep) {
      return onCancel();
    }

    actions.previousStep({ id });
  };

  const handleNext = () => {
    actions.validateForm({ id });

    if (isLastStep) {
      return onSubmit(formData)
    }

    actions.nextStep({ id });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!disabled) {
      handleNext();
    }
  }

  if (pending) {
    return <Loader.Simple />
  }

  return (
    <form id={id} onSubmit={handleFormSubmit}>
      {
        children({
          FormComponent: React.cloneElement(
            components[stepIndex],
            {
              state: {
                formData: formData[ steps[stepIndex] ],
                onBlur: handleBlur,
                onChange: handleChange
              }
            }
          ),
          back: handlePrevious,
          currentStep: stepIndex + 1,
          totalSteps: steps.length,
          isFirstStep,
          isLastStep,
          disableBackButton: false,
          disableNextButton: disabled
        })
      }
    </form>
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

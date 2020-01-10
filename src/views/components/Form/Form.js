import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useDebouncedEffect from 'use-debounced-effect';

import {
  initializeForm,
  setFieldTouched,
  updateFieldValue,

  getFormState,


  validateForm,

  previousStep,
  nextStep,


  getFormData,
  getNormalizedFormData,
  getFormStatus,
  getSteps,
  getStepIndex
} from 'state/ducks/form';

import { Loader } from 'views/components/Loader';
import { Field } from '../Form';

const Component = ({
  uid,
  schema,
  steps = [],
  formState,
  children,
  onSubmit,
  actions
}) => {
  useEffect(() => {
    actions.initializeForm({ uid, schema });
  }, [uid, schema, actions]);

  const handleBlur = ({ field }) => {
    // handle blur actions
  }

  const handleChange = ({ field, value }) => {
    actions.updateFieldValue({ uid, field, value });
  }

  const handleFormSubmit = () => {
    onSubmit(uid)
  }

  if (!formState) {
    return <Loader.Simple />
  }

  return (
    <form id={uid} onSubmit={handleFormSubmit}>
      {
        children({
          state: {},
          provided: {
            uid,
            onBlur: handleBlur,
            onChange: handleChange
          },0
          submitDisabled: true
        })
      }
    </form>
  )
}

const mapStateToProps = (state, { uid }) => {
  return {
    formState: getFormState(state, { uid })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      initializeForm,
      setFieldTouched,
      updateFieldValue
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);


const Component2 = ({
  id = null,
  schema = {},
  components = [],
  onSubmit,
  onCancel,
  children,

  formState,
  normalizedFormState,
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
    actions.initializeForm({ uid: id, schema });
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
    console.log(normalizedFormState);

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
      return onSubmit(formState)
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
          // return current step Component, field and state
          Component: React.cloneElement(
            components[stepIndex],
            {
              provided: {
                onBlur: handleBlur,
                onChange: handleChange,
                state: formState[ steps[stepIndex] ],
              },
              state: formState[ steps[stepIndex] ]
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

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  initializeForm,
  validateForm,

  getPendingStatus,
  getFormData
} from 'state/ducks/forms';

import { Loader } from 'views/components/Loader';

const Component = ({
  id = null,
  schema = {},
  components = [],
  pending = false,
  formData,
  children,
  actions
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    actions.initializeForm({ id, schema });
  //eslint-disable-next-line
  }, []);

  const handleChange = ({ name, value }) => {
    actions.validateForm({ id, name, value, currentStep })
  }

  if (!formData) {
    return <Loader.Simple />
  }

  return (
    <>
      {
        children({
          Component:
            React.cloneElement(
              components[currentStep - 1],
              {
                state: formData[currentStep],
                update: handleChange,
              }
            ),
          currentStep,
          totalSteps: Object.keys(formData).length
        })
      }
    </>
  )
}

const mapStateToProps = (state, { id }) => {
  return {
    pending: getPendingStatus(state, { id }),
    formData: getFormData(state, { id })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeForm, validateForm }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

const Component2 = ({ schema = {}, components, children, actions }) => {
  const [initialized, setInitialized] = useState(false);
  const [formState, setFormState] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  // development function
  useEffect(() => {
    console.log(formState)
  }, [formState]);

  useEffect(() => {
    // initial setup..
    // setFormState(convertSchema({ schema }));
    // setInitialized(true);
  }, [schema])

  const handleChange = ({ name, value }) => {
    setFormState([
      ...formState.map((state, index) => {
        if (index !== currentStep) return state;

        return ({
          ...formState[index],
          [name]: {
            ...formState[index][name],
            value
          }
        })
      })
    ])
  }

  const Component = (initialized)
    ? React.cloneElement(
        components[currentStep],
        {
          state: formState[currentStep],
          update: handleChange,
        }
      )
    : <Loader.Simple />

  return (
    <>
      {
        children({
          Component,
          currentStep,
        })
      }
    </>
  )

}

const convertSchema = ({ schema }) => {
  console.log('converting schema')
  return schema.map((state, index) => {
    return {
      ...Object.entries(state)
        .reduce((obj, [key, values]) => {
          return obj = {
            ...obj,
            [key]: {
              ...values,
              name: key
            }
          }
        }, {})
    }
  })
}

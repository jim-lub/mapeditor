import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  initializeForm,
  updateValue,

  getFormData
} from 'state/ducks/form';

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
    actions.updateValue({ id, name, value, step: currentStep })
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
    formData: getFormData(state, { id })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeForm, updateValue }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

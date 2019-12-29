import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import createSceneFormSchema from './create-scene-form-schema';

import { Form, Field, ProgressBar2 } from 'views/components/Form';
import { ModalComponents } from 'views/components/Modal';

import styles from './create-scene-form.module.css';

const Component = ({ actions, onClose }) => {
  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form
      id="create-scene-form"
      schema={createSceneFormSchema()}
      components={[<StepOne />, <StepTwo />]}
      onSubmit={handleSubmit}
    >
      {
        ({ Component, back, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div>
              <div className={styles.componentWrapper}>
                { Component }
              </div>

              <ProgressBar2 currentStep={currentStep} totalSteps={totalSteps} />

              <ModalComponents.DefaultFooter
                buttonLeft={
                  () => (
                    <button type="button" onClick={(isFirstStep) ? onClose : back}>
                      { (isFirstStep) ? 'Cancel' : 'Back' }
                    </button>
                  )
                }

                buttonRight={
                  () => (
                    <button type="submit" disabled={disableNextButton} className="blue">
                      { (isLastStep) ? 'Create' : 'Next' }
                    </button>
                  )
                }
              />
            </div>
          )
        }
      }
    </Form>
  )
}

const StepOne = ({ provided, state }) => {
  return (
    <>
      <Field.Text name="scene-name" {...provided} />
      <Field.TextArea name="scene-description" {...provided} />
    </>
  )
}

const StepTwo = ({ provided, state }) => {
  return (
    <>
      <Field.Select name="preset" {...provided} />
      <Field.Number name="columns" {...provided} />
      <Field.Number name="rows" {...provided} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

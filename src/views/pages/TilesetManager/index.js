import React, { useState } from 'react';

import { Modal, ModalComponents, useModal } from 'views/components/_Modal';
// import { FileUploader } from 'views/components/tilesets/FileUploader';
import { Button, Form, Field, ProgressBar2 } from 'views/components/Form';
import { schema } from './reduxFormTestSchema';

export const TilesetManager = () => {
  const [isVisible, openModal, closeModal] = useModal();

  return (
    <div>
      <div style={{minWidth: 400, maxWidth: 600, margin: "50px auto", backgroundColor: "#fff", borderRadius: 6, border: "solid 1px #e5e5e5"}}>

        <button onClick={openModal}>Open Modal</button>

        <Modal isVisible={isVisible} onClose={closeModal}>
          <ReduxFormTestComponent onClose={closeModal} />
        </Modal>
      </div>
    </div>
  )
}


const ReduxFormTestComponent = ({ onClose }) => {
  const data = schema({
    columns: 'initialValue for columns'
  });

  const steps = [
    <StepOne />,
    <StepTwo />
  ];

  const handleCancel = () => {
    console.log('closing modal')
  }

  const handleSubmit = (data) => {
    console.log(data);
    onClose();
  }

  return (
    <Form id="reduxFormTestComponent" schema={data} components={steps} onSubmit={handleSubmit} onCancel={handleCancel}>
      {
        ({ Component, back, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div style={{}}>
              <div style={{padding: 15, paddingBottom: 0}}>
                { Component }
              </div>

              <div>
                <ProgressBar2 currentStep={currentStep} totalSteps={totalSteps} />
              </div>

              <ModalComponents.DefaultFooter
                buttonLeft={{
                  text: (isFirstStep) ? 'Close' : 'Back',
                  action: (isFirstStep) ? onClose : back,
                }}

                buttonRight={{
                  text: (isLastStep) ? 'Submit' : 'Next',
                  submit: true,
                  disabled: disableNextButton
                }}
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
    <div>
      <Field.Text name={"project-name"} {...provided} />
      <Field.Text name={"scene-name"} autoFocus={true} {...provided} />
      <Field.Text name={"scene-name-confirm"} {...provided} />
      <Field.TextArea name={"scene-description"} {...provided} />
      <Field.Select name={"scene-presets"} {...provided} />
      <Field.Number name={"columns"} {...provided} />
      <Field.Number name={"rows"} {...provided} />
      <Field.Password name={"hidden"} {...provided} />
    </div>
  )
}

const StepTwo = ({ provided, state }) => {
  return (
    <>
      <Field.Text name={"testlabel"} autoFocus={true} {...provided} />
      <Field.Text name={"novalidation"} {...provided} />
      <Field.Text name={"rows"} {...provided} />
    </>
  )
}

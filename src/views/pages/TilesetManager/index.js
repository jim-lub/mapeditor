import React from 'react';

// import { FileUploader } from 'views/components/tilesets/FileUploader';
import { Form, Field } from 'views/components/Form';
import reduxFormTestSchema from './reduxFormTestSchema';

export const TilesetManager = () => {
  return (
    <div>
      <div style={{minWidth: 400, maxWidth: 600, margin: "50px auto", padding: 30, backgroundColor: "#fff"}}>
        <ReduxFormTestComponent />
      </div>
    </div>
  )
}

const ReduxFormTestComponent = () => {
  const steps = [
    <StepOne />,
    <StepTwo />
  ];

  return (
    <Form id={"reduxFormTestComponent"} schema={reduxFormTestSchema} components={steps}>
      {
        ({ Component, currentStep, totalSteps }) => {
          return (
            <div style={{}}>
              {Component}
              <div style={{}}>{currentStep}/{totalSteps}</div>
            </div>
          )
        }
      }
    </Form>
  )
}

const StepOne = ({ state }) => {
  return (
    <>
      <Field.Text name={"firstName"} {...state} />
      <Field.Text name={"lastName"} {...state} />
    </>
  )
}

const StepTwo = ({ state, update }) => {
  return (
    <>
      <Field.Text name={"street"} {...state} />
      <Field.Text name={"city"} {...state} />
    </>
  )
}

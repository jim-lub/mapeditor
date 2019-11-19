import React from 'react';

// import { FileUploader } from 'views/components/tilesets/FileUploader';
import { ReduxForm, Field } from 'views/components/ReduxForm';
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
    <ReduxForm id={"reduxFormTestComponent"} schema={reduxFormTestSchema} components={steps}>
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
    </ReduxForm>
  )
}

const StepOne = ({ state, update }) => {
  console.log(state)
  return (
    <>
      <Field.Text {...state['firstName']} onChange={update} /> <br /><br/>
      <Field.Text {...state['lastName']} onChange={update} />
    </>
  )
}

const StepTwo = ({ state, update }) => {
  return (
    <>
      <Field.Text {...state['street']} onChange={update} /> <br /><br/>
      <Field.Text {...state['city']} onChange={update} />
    </>
  )
}

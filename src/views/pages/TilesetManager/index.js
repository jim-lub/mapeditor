import React from 'react';

// import { FileUploader } from 'views/components/tilesets/FileUploader';
import { Form, Field, ProgressBar2 } from 'views/components/Form';
import { schema } from './reduxFormTestSchema';

export const TilesetManager = () => {
  return (
    <div>
      <div style={{minWidth: 400, maxWidth: 600, margin: "50px auto", backgroundColor: "#fff", borderRadius: 6, border: "solid 1px #e5e5e5"}}>
        <ReduxFormTestComponent />
      </div>
    </div>
  )
}


const ReduxFormTestComponent = () => {
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
    console.log(data)
  }

  return (
    <Form id="reduxFormTestComponent" schema={data} components={steps} onSubmit={handleSubmit} onCancel={handleCancel}>
      {
        ({ Component, ButtonBack, ButtonContinue, currentStep, totalSteps }) => {
          return (
            <div style={{}}>
              <div style={{padding: 15, paddingBottom: 0}}>
                {Component}
              </div>

              <div>
                <ProgressBar2 currentStep={currentStep} totalSteps={totalSteps} names={['Map', 'Presets', 'Tilesets', 'Swatches', 'Create']}/>
              </div>

              <div className="clearfix" style={{padding: 5, backgroundColor: "#e9e9e9", borderRadius: "0 0 4px 4px", boxShadow: "0px -1px 1px #d4d4d4"}}>
                  <div style={{float: 'left'}}>{ButtonBack}</div>
                  <div style={{float: 'right'}}>{ButtonContinue}</div>
              </div>
            </div>
          )
        }
      }
    </Form>
  )
}

const StepOne = ({ state }) => {
  return (
    <div>
      <Field.Text name={"name"} autoFocus={true} {...state} />
      <Field.Select name={"columns"} {...state} />
      <Field.Text name={"rows"} {...state} />
      <Field.Text name={"rows"} {...state} />
      <Field.Text name={"name"} {...state} />
      <Field.Text name={"columns"} {...state} />
      <Field.Text name={"rows"} {...state} />
      <Field.Text name={"name"} {...state} />
      <Field.Text name={"columns"} {...state} />
      <Field.Text name={"rows"} {...state} />
      <Field.Text name={"rows"} {...state} />
    </div>
  )
}

const StepTwo = ({ state, update }) => {
  return (
    <>
      <Field.Text name={"testlabel"} autoFocus={true} {...state} />
      <Field.Text name={"novalidation"} {...state} />
      <Field.Text name={"rows"} {...state} />
    </>
  )
}

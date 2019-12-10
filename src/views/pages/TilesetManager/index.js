import React from 'react';

// import { FileUploader } from 'views/components/tilesets/FileUploader';
import { Button, Form, Field, ProgressBar2 } from 'views/components/Form';
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
        ({ FormComponent, back, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div style={{}}>
              <div style={{padding: 15, paddingBottom: 0}}>
                { FormComponent }
              </div>

              <div>
                <ProgressBar2 currentStep={currentStep} totalSteps={totalSteps} />
              </div>

              <div>
                <Button.Back isFirstStep={isFirstStep} onClick={back} />
                <Button.Next isDisabled={disableNextButton} isLastStep={isLastStep}/>
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
      <Field.Text name={"project-name"} {...state} />
      <Field.Text name={"scene-name"} autoFocus={true} {...state} />
      <Field.Text name={"scene-name-confirm"} {...state} />
      <Field.TextArea name={"scene-description"} {...state} />
      <Field.Select name={"scene-presets"} {...state} />
      <Field.Number name={"columns"} {...state} />
      <Field.Number name={"rows"} {...state} />
      <Field.Password name={"hidden"} {...state} />
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

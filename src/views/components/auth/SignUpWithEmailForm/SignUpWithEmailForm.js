import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUpWithEmail } from 'state/ducks/auth';

import signUpFormSchema from './sign-up-form-schema';

import { Button, Form, Field } from 'views/components/Form';

const Component = ({ actions }) => {
  const handleSubmit = (data) => {
    const { email, password } = data['sign-up'];

    actions.signUpWithEmail({
      email: email.value,
      password: password.value
    })
  }

  return (
    <Form id="sign-up-form" schema={signUpFormSchema()} components={[<SignUpForm />]} onSubmit={handleSubmit}>
      {
        ({ Component, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div style={{paddingTop: 7}}>
              { Component }

              <Button.Next
                isDisabled={disableNextButton}
                isLastStep={isLastStep}
                text={['Sign Up', 'Sign Up']}
              />
            </div>
          )
        }
      }
    </Form>
  )
}

const SignUpForm = ({ provided, state }) => {
  return (
    <>
      <Field.Text name="email" {...provided} />
      <Field.Password name="password" {...provided} />
      <Field.Password name="password-confirm" {...provided} />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signUpWithEmail }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

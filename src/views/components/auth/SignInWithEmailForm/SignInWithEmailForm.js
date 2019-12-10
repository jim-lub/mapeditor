import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInWithEmail } from 'state/ducks/auth';

import signInFormSchema from './sign-in-form-schema';

import { Button, Form, Field } from 'views/components/Form';

const Component = ({ actions }) => {
  const handleSubmit = (data) => {
    const { email, password } = data['sign-in'];

    actions.signInWithEmail({
      email: email.value,
      password: password.value
    });
  }

  return (
    <Form id="sign-in-form" schema={signInFormSchema()} components={[<SignInForm />]} onSubmit={handleSubmit}>
      {
        ({ FormComponent, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div style={{paddingTop: 7}}>
              { FormComponent }

              <Button.Next
                isDisabled={disableNextButton}
                isLastStep={isLastStep}
                text={['Sign In', 'Sign In']}
              />
            </div>
          )
        }
      }
    </Form>
  )
}

const SignInForm = ({ state }) => {
  return (
    <>
      <Field.Text name="email" {...state} />
      <Field.Password name="password" {...state} />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signInWithEmail }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUpWithEmail } from 'state/ducks/auth';

import signUpFormSchema from './sign-up-form-schema';

import { Form, Field, FormComponent } from 'views/components/Form';

const Component = ({ actions }) => {
  const handleSubmit = ({ state }) => {
    actions.signUpWithEmail({
      email: state.email,
      password: state.password
    })
  }

  return (
    <Form uid="sign-up-form" schema={signUpFormSchema()} onSubmit={handleSubmit}>
      {
        ({ state, provided, submitDisabled }) => {
          return (
            <div style={{paddingTop: 7}}>
              <FormComponent.Row forField="email" {...provided}>
                <Field.Text field="email" {...provided} />
              </FormComponent.Row>

              <FormComponent.Row forField="password" {...provided}>
                <Field.Password field="password" {...provided} />
              </FormComponent.Row>

              <FormComponent.Row forField="password-confirm" {...provided}>
                <Field.Password field="password-confirm" {...provided} />
              </FormComponent.Row>

              <button type="submit" className="blue" disabled={submitDisabled}>
                Sign Up
              </button>
            </div>
          )
        }
      }
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signUpWithEmail }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

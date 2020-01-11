import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInWithEmail } from 'state/ducks/auth';

import signInFormSchema from './sign-in-form-schema';

import { Form, Field, FormComponent } from 'views/components/Form';

const Component = ({ actions }) => {
  const handleSubmit = ({ state }) => {
    actions.signInWithEmail({
      email: state.email,
      password: state.password
    });
  }

  return (
    <Form uid="sign-in-form" schema={signInFormSchema()} onSubmit={handleSubmit}>
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

              <button type="submit" className="blue" disabled={submitDisabled}>
                Sign In
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
    actions: bindActionCreators({ signInWithEmail }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

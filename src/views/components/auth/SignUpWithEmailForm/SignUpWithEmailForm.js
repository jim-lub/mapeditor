import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signUpWithEmail } from 'state/ducks/auth';

import { getFieldStateErrors } from 'lib/validation';
import Form, { Field } from 'views/components/Forms';

const Component = ({ actions }) => {
  const [fieldStateEmail, setFieldStateEmail] = useState();
  const [fieldStatePassword, setFieldStatePassword] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const fieldStateArray = [fieldStateEmail, fieldStatePassword];

  useEffect(() => {
   setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  const handleSubmit = () => {
    actions.signUpWithEmail({
      email: fieldStateEmail.value,
      password: fieldStatePassword.value
    })
  }

  return (
    <>
    <Form.Group onSubmit={handleSubmit}>
      <Field.Text
        name="signupEmail"
        label="Email"
        onStateChange={setFieldStateEmail}
        displayErrors={false}
        required
      />

      <Field.Password
        name="signupPassword"
        label="Password"
        onStateChange={setFieldStatePassword}
        displayErrors={false}
        required
      />

      <button type="submit" className="blue" disabled={disableSubmit}>Create account</button>
    </Form.Group>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signUpWithEmail }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signInWithEmail } from 'state/ducks/auth';

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
    actions.signInWithEmail({
      email: fieldStateEmail.value,
      password: fieldStatePassword.value
    })
  }

  return (
    <>
    <Form.Group onSubmit={handleSubmit}>
      <Field.Text
        name="signinEmail"
        label="Email"
        onStateChange={setFieldStateEmail}
        displayErrors={false}
        required
      />

      <Field.Password
        name="signinPassword"
        label="Password"
        onStateChange={setFieldStatePassword}
        displayErrors={false}
        required
      />

      <button type="submit" className="blue" disabled={disableSubmit}>Sign In</button>
    </Form.Group>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signInWithEmail }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

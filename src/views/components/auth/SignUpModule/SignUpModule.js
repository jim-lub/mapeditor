import React from 'react';
import { connect } from 'react-redux';

import { getAuthError } from 'state/ducks/auth';

import { SignUpWithEmailForm } from 'views/components/auth';

import styles from './signup.module.css';

const Component = ({ authError, style, actions }) => {
  return (
    <div className={styles.wrapperOuter} style={style}>
      <h1>Create account</h1>
      <div className={styles.wrapperInner}>

        <div className={styles.emailSignUpWrapper}>
          <SignUpWithEmailForm />
        </div>

      </div>

      <div className={styles.error}>
        {
          (authError && authError.form === 'signup')
            ? authError.message
            : null
        }
      </div>

      <div className={styles.information}>
        An account is mandatory for the app to function properly. I've shut off email verification for now,
        so you're able to create an account with a "fake" email address just to get passed the auth screen and check out the
        rest of the app!
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: getAuthError(state)
  }
}

export default connect(mapStateToProps)(Component);

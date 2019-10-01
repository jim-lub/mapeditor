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
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: getAuthError(state)
  }
}

export default connect(mapStateToProps)(Component);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  signInWithGoogle,
  getAuthError
} from 'state/ducks/auth';

import {
  SignInWithEmailForm,
  SignInWithProviderButton
} from 'views/components/auth';

import styles from './signin.module.css';

const Component = ({ authError, style, actions }) => {
  const handleGoogleSignIn = () => {
    actions.signInWithGoogle();
  }

  return (
    <div className={styles.wrapperOuter} style={style}>
      <h1>Sign In</h1>
      <div className={styles.wrapperInner}>

        <div className={styles.emailSignInWrapper}>
          <SignInWithEmailForm />
        </div>

        <div className={"clearfix " + styles.providerWrapper}>
          <div className={styles.providerButton} style={{marginRight: 4}}>
            <SignInWithProviderButton providerName="GOOGLE" onClick={handleGoogleSignIn} />
          </div>

          <div className={styles.providerButton} style={{marginRight: 4}}>
            <SignInWithProviderButton providerName="FACEBOOK" disabled={true} />
          </div>

          <div className={styles.providerButton}>
            <SignInWithProviderButton providerName="GITHUB" disabled={true} />
          </div>
        </div>

      </div>

      <div className={styles.error}>
        {
          (authError && authError.form === 'signin')
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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signInWithGoogle }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

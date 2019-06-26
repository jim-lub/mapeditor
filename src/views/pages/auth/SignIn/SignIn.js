import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SignInWithProviderButton } from 'views/components/auth';
import { signInWithGoogle } from 'state/ducks/auth';

const SignIn = ({ actions }) => {
  const handleClick = () => {
    actions.signInWithGoogle();
  }

  return (
    <div style={{margin: 10}}>
      <h2>SignIn</h2>
      <SignInWithProviderButton providerName="google" onClick={handleClick} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signInWithGoogle }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignInWithProviderButton from './components/SignInWithProviderButton';

import { signInWithGoogle } from 'actions/auth';

const SignIn = ({ actions }) => {

  return (
    <>
      <div>SignIn</div>
      <div>-------------</div>
      <div style={{width: 250}}>
        <SignInWithProviderButton name="Google" onClick={() => actions.signInWithGoogle()} /><br />
      </div>
    </>
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

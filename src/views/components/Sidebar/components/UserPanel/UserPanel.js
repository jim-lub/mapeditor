import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser, getAuthStatus, signInWithGoogle, signOut } from 'state/ducks/auth';

import styles from './userpanel.module.css';

const UserPanel = ({ authUser, authStatus, actions }) => {
  if (!authStatus) {
    return <>Loading...</>
  }

  if (!authUser) {
    return (
      <div className={styles.container}>
        Not signed in<br />

        <button
          onClick={(e) => {
            e.preventDefault();
            actions.signInWithGoogle();
          }}
          className="green"
        >
          Sign In Google
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      { authUser.username }<br />

      <button onClick={(e) => {
        e.preventDefault();
        actions.signOut();
      }}>
        <img src={require('../../../../../assets/static/icons/sidebar/sign-out.png')} alt="" />
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    authStatus: getAuthStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      signInWithGoogle,
      signOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);

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
        Not Signed In..
      </div>
    )
  }

  return (
    <div className={styles.container}>
      { authUser.username }<br />

      <div onClick={() => {
        actions.signOut();
      }} className={styles.link}>
        <img src={require('../../../../../assets/static/icons/sidebar/sign-out.png')} alt="" width={12} height={12}/> Sign Out
      </div>
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

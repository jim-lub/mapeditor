import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import {
  getAuthUserSelector,
  getAuthIsInitializedSelector
} from 'reducers/auth';

const ProtectedRoute = ({ component: Component, rules, redirect, authUser, initialized, exact, path }) => {
  const isSignedIn = !!authUser;

  const ruleset = rules.map(rule => {
    switch (rule) {
      case 'IS_SIGNED_IN':
        return isSignedIn;
      case 'IS_NOT_SIGNED_IN':
        return !isSignedIn;
      default:
        return false;
    }
  });

  const isAccessible = ruleset.every((bool) => bool);

  if (!initialized) {
    return <div>Loading..</div>
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={
        props =>
          isAccessible
          ? <Component {...props} />
          : <Redirect to={redirect} />
      }
    />
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUserSelector(state),
    initialized: getAuthIsInitializedSelector(state)
  }
}

export default connect(mapStateToProps)(ProtectedRoute);

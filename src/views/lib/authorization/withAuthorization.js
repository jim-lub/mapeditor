import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import hasAuthorization from './hasAuthorization';
import { getAuthUser, getAuthStatus } from 'state/ducks/auth';


export default (Component, ruleset, redirectTo) => {
  const WithAuthorization = ({ authUser, initialized }) => {
    if (!initialized) return <Loading />;

    const checkAuthorization = hasAuthorization()[ruleset[0]](authUser, initialized);

    if ( checkAuthorization ) {
      return <Component />;
    } else {
      return <Redirect to={redirectTo} />;
    }
  };

  const mapStateToProps = (state) => {
    return {
      authUser: getAuthUser(state),
      initialized: getAuthStatus(state)
    }
  }

  return connect(mapStateToProps)(WithAuthorization);
}

const Loading = () => {
  return <div>Loading..</div>
}

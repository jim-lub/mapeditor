import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser, getAuthStatus, signOut } from 'state/ducks/auth';
import { default as routes } from 'lib/routes';
import * as ruleTypes from 'views/lib/authorization/ruleTypes';

import { CustomNavLink } from './CustomNavLink';
import { CustomLink } from './CustomLink';

import styles from './navbar.module.css';

const Component = ({ authUser, authStatus, actions }) => {
  if (!authStatus) return null;

  const handleRouteFilter = (route) => {
    if (authUser) {
      return (ruleTypes.IS_SIGNED_IN === route.ruleset[0])
    } else {
      return (ruleTypes.IS_NOT_SIGNED_IN === route.ruleset[0])
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={"clearfix " + styles.wrapperInner}>
        {
          routes.filter(route => handleRouteFilter(route))
            .map((route, index) =>
              <CustomNavLink
                key={index}
                exact={route.exact}
                path={route.path}
                name={route.name}
                icon={route.icon}
              />
            )
        }

        {
          (authUser)
            ? <CustomLink name="Sign out" onClick={actions.signOut} position="right" />
            : null
        }
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
    actions: bindActionCreators({ signOut }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser, getAuthStatus, signOut } from 'state/ducks/auth';
import { default as routes } from 'lib/routes';
import * as ruleTypes from 'views/lib/authorization/ruleTypes';

import { CustomNavLink, CustomLink } from './components';
import ReactTooltip from 'react-tooltip';

import styles from './sidebar.module.css';

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
    <div className={styles.sidebar}>
      <div className={styles.navList}>
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
      </div>

      {
        (authUser)
          ? <div className={styles.signOutButton}><CustomLink name="Sign out" onClick={actions.signOut}/></div>
          : null
      }

      <ReactTooltip
        id="sidebar-tooltip-handler"
        place="right"
        offset={{top: 4, left: 13}}
        type="light"
        border={true}
        delayShow={200}
        effect="solid"
        className={styles.sidebarTooltip}
      />
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
      signOut
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

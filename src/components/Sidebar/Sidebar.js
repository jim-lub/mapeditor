import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { NavButton } from './components/NavButton';

import { signOut } from 'actions/auth';
import { getAuthUserSelector } from 'reducers/auth';

import SIDEBAR_NAV_LINKS from 'constants/sidebar';

import styles from './sidebar.module.css'

const Sidebar = ({ authUser, actions }) => {
  return (
    <div className={styles.container}>
      <SidebarNavlinks authUser={authUser} actions={actions} />
    </div>
  )
}

const SidebarNavlinks = ({ authUser, actions }) => {
  return (
    <ul>
      {
        Object.entries(SIDEBAR_NAV_LINKS)
          .map((navLink, index) => {
            const [name, data] = navLink;

            if (!data) {
              // Add Linebreak
              return <li key={`linebreak-${index}`} className={styles.linebreak}></li>
            }
            return (
              <li key={`${name}-${index}`}>
                <NavButton
                  name={name}
                  exact={data.exact}
                  route={data.route}
                />
              </li>
            )
          })
      }
      <li className={styles.linebreak}></li>
      <li>{(authUser) ? "True" : "False"}</li>
      <li>{(authUser) ? <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => actions.signOut()}>Sign Out</span> : ""}</li>
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUserSelector(state) || null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ signOut }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

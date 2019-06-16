import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from 'actions/auth';
import { getAuthUserSelector } from 'reducers/auth';

import SIDEBAR_NAV_LINKS from 'constants/sidebar';

const Sidebar = ({ authUser, actions }) => {
  return (
    <div className="">
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
              return <li key={`linebreak-${index}`}>--------</li>
            }
            return (
              <li key={`${name}-${index}`}>
                <NavLink exact={data.exact} to={data.route} className="sidebar-navlink" activeClassName="sidebar-navlink-active">
                  {name}
                </NavLink>
              </li>
            )
          })
      }
      <li>--------</li>
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

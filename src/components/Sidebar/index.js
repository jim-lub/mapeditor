import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAuthUserSelector } from 'reducers/auth';

import SIDEBAR_NAV_LINKS from 'constants/sidebar';

const Sidebar = () => {
  return (
    <div className="">
      <SidebarNavlinks />
    </div>
  )
}

const SidebarNavlinks = () => {
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
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUserSelector(state) || null
  }
}

export default connect(mapStateToProps)(Sidebar);

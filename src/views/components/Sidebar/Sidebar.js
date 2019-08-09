import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { nav } from 'constants/routes';

import { UserPanel } from './components/UserPanel';
import { getAuthUser, getAuthStatus } from 'state/ducks/auth';

import styles from './sidebar.module.css';

const Sidebar = ({ authUser, initialized }) => {
  if (!initialized) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.navLinksWrapper}>
        {
          nav.map((link, index) => {
            return (
              <Fragment key={index}>
                {
                  (link.auth === !!authUser)
                    ?   <Link name={link.name} icon={link.icon} route={link.route} />
                      : <LockedLink name={link.name} />
                }
                <br />
              </Fragment>
            )
          })
        }
      </div>
      <div className={styles.userPanelWrapper}>
        <UserPanel />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    initialized: getAuthStatus(state)
  }
}

export default connect(mapStateToProps)(Sidebar);

const Link = ({ name, icon, route }) => {
  return (
    <NavLink
      exact={route.exact}
      to={route.path}
      className={styles.link}
      activeClassName={styles.linkActive}
    >
      <img src={require(`../../../assets/static/icons/sidebar/${icon}.png`)} alt="" width={16} height={16}/>
      <span> </span>
      { name }
    </NavLink>
  )
}

const LockedLink = ({ name }) => {
  return (
    <span className={styles.linkLocked}>
      <img src={require('../../../assets/static/icons/other/lock-16.png')} alt="" />
      <span> </span>
      { name }
    </span>
  )
}

const Loading = () => {
  return <div>Loading..</div>
}

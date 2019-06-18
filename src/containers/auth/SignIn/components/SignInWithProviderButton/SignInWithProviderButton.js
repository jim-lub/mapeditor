import React from 'react';

import { ReactComponent as GoogleLogo } from 'assets/static/icons/svg/google.svg';

import styles from './signinwithproviderbutton.module.css';

export default (props) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.onClick();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit">
        <GoogleLogo className={styles.providerLogo} /><br /><br />
        Sign In With {props.name}
      </button>
    </form>
  )
}

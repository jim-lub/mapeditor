import React from 'react';

import { ReactComponent as GoogleLogo } from 'assets/static/icons/svg/google.svg';
// import { ReactComponent as FacebookLogo } from 'assets/static/icons/svg/facebook.svg';
// import { ReactComponent as GithubLogo } from 'assets/static/icons/svg/github.svg';

import styles from './signinwithproviderbutton.module.css';

export default ({ providerName, onClick }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onClick();
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className={styles.button}>
        <GoogleLogo className={styles.providerLogo} /><br />
      </button>
    </form>
  )
}

import React from 'react';

import { ReactComponent as GoogleLogo } from 'assets/static/icons/svg/google.svg';
import { ReactComponent as FacebookLogo } from 'assets/static/icons/svg/facebook.svg';
import { ReactComponent as GithubLogo } from 'assets/static/icons/svg/github.svg';

import styles from './signinwithproviderbutton.module.css';

export default ({ providerName, disabled, onClick }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onClick();
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={disabled} className={(disabled) ? styles.buttonDisabled : styles.button}>
        { (providerName === 'GOOGLE') ? <GoogleLogo className={styles.providerLogo} /> : null }
        { (providerName === 'FACEBOOK') ? <FacebookLogo className={styles.providerLogoDisabled} /> : null }
        {  (providerName === 'GITHUB') ? <GithubLogo className={styles.providerLogoDisabled} /> : null }
      </button>
    </form>
  )
}

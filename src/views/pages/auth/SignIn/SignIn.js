import React from 'react';

import {
  SignInModule,
  SignUpModule
} from 'views/components/auth';

import styles from './signin.module.css';

export default () => {
  return (
    <div className={"clearfix " + styles.wrapper}>
      <div className={styles.signInModule}><SignInModule /></div>
      <div className={styles.signUpModule}><SignUpModule /></div>
    </div>
  )
}

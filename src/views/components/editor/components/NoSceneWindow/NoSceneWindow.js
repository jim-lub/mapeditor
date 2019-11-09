import React from 'react';

import routes from 'lib/routes';

import { LinkButton } from 'views/components/LinkButton';

import { ReactComponent as NotFoundIcon } from 'assets/static/icons/other/404.svg';

import styles from './noscenewindow.module.css';

export default () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <NotFoundIcon className={styles.icon}/>
        </div>
        <h3 className={styles.headerText}>Sorry, we couldn't find any scenes on your account..</h3>
        <br/>
        <LinkButton className="blue" to="/projects">Get started</LinkButton>
      </div>
    </div>
  );
}

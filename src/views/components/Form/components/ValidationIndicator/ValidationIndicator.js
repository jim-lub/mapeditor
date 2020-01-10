import React from 'react';

import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';

import styles from './validation-indicator.module.css';

export default ({ touched, valid }) => {
  return (
    <div className={styles.wrapper}>
      {
        touched && !valid &&
        <InvalidIcon className={styles.icon}/>
      }

      {
        touched && valid &&
        <ValidIcon className={styles.icon}/>
      }
    </div>
  );
}

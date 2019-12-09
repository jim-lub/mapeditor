import React from 'react';

import { concatClassNames } from 'lib/utils';

import styles from './row.module.css';

export default ({ fieldName, fieldLabel, fieldDesc, blurred, errors = {}, children }) => {
  const errorContainerClassNames = concatClassNames([
    styles.errorContainer,
    ((Object.keys(errors).length > 0) && blurred) ? null : styles.collapsed
  ]);

  const renderErrors = () => Object.values(errors).map(({ message = '', type }) => {
    return (
      <li key={type}>{ message || type }</li>
    )
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelContainer}>
        <label htmlFor={fieldName}>
          { fieldLabel }
        </label>

        <br />

        <span className={styles.fieldDescText}>
          { fieldDesc }
        </span>
      </div>

      <div className={styles.inputContainer}>
        { children }
      </div>

      <div className={errorContainerClassNames}>
        <ul>
          { renderErrors() }
          <li style={{height: 0}}></li>
        </ul>
      </div>
    </div>
  );
}

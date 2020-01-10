import React from 'react';
import { connect } from 'react-redux';

import {
  getFieldErrors,
  getFieldLabel,
  getFieldMeta,
} from 'state/ducks/form';

import { concatClassNames } from 'lib/utils';

import styles from './row.module.css';

const Component = ({ errors = [], label, meta, forField, children }) => {
  const errorContainerClassNames = concatClassNames([
      styles.errorContainer,
      ((Object.keys(errors).length > 0) && meta.touched) ? null : styles.collapsed
    ]);

    const renderErrors = () => Object.values(errors).map(({ message = '', type }) => {
      return (
        <li key={type}>{ message || type }</li>
      )
    })

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexWrapper}>
        <div className={styles.labelWrapper}>
          <label htmlFor={forField} className={styles.label}>
            { label }
          </label>
        </div>

        <div className={styles.childrenWrapper}>
          { children }
        </div>
      </div>

      <div className={errorContainerClassNames}>
        <ul>
          { renderErrors() }
          <li style={{height: 0}}></li>
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { uid, forField } = ownProps;

  return {
    errors: getFieldErrors(state, { uid, field: forField }),
    label: getFieldLabel(state, { uid, field: forField }),
    meta: getFieldMeta(state, { uid, field: forField })
  }
}

export default connect(mapStateToProps)(Component);

import React from 'react';

import '../../default.module.css';
import formStyles from '../../form.module.css';

export default ({ initialized = true, errors }) => {
  return (
    <div className={formStyles.errorWrapper}>
      {
        (initialized && errors.length > 0)
          ? <ul><ErrorList errors={errors} /></ul>
          : null
      }
    </div>
  )
}

const ErrorList = ({ errors }) => {
  return (
    errors.map((message, index) => (
      <li
        key={index}
        className={formStyles.errorListItem}>
          {message}
      </li>
    ))
  )
}

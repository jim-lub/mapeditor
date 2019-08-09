import React from 'react';

export default ({ initialized = true, errors }) => {
  return (
    <div className="form-error-wrapper">
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
        className="form-error-li">
          {message}
      </li>
    ))
  )
}

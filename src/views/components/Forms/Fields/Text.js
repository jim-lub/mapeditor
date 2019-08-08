import React, { useState, useEffect } from 'react';

import { useFormValidation } from 'views/lib/form-validation';

export default ({ onStateChange: setParentState, name, label, placeholder, matches, required }) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue, errors] = useFormValidation({
    name,
    match: matches,
    required
  });

  const handleChange = (e) => {
    setValue(e.target.value);
    setInitialized(true);
  }

  const handleBlur = () => {
    setInitialized(true);
  }

  useEffect(() => {
    if (setParentState) {
      setParentState({
        value,
        errors
      });
    }
  }, [value, errors, setParentState])

  const renderErrors = errors.map((message, index) => {
    return <li key={index} className="form-error-li">{message}</li>;
  })

  return (
    <div className="form-wrapper">
      <div className="form-field-wrapper">
        <label htmlFor={name}>
          {label}
        </label>

        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          className={(initialized && errors.length > 0) ? "validation-false" : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="form-error-wrapper">
        {
          (initialized && errors.length > 0)
            ? <ul>{renderErrors}</ul>
            : null
        }
      </div>
    </div>
  )
};

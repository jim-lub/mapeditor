import React, { useState, useEffect } from 'react';

import { useFormValidation } from 'views/lib/form-validation';

export default ({ name, label, placeholder, initialValue = 0, required, onStateChange: setParentState }) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const { value } = e.target;

    if (!isNaN(value)) {
      setValue( Number(value) );
    }
    setInitialized(true);
  }
  const handleBlur = () => setInitialized(true);

  useEffect(() => {
    setParentState({ value, errors: [] })
  }, [value, setParentState]);

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
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  )
};

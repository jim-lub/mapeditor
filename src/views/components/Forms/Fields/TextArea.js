import React, { useState, useEffect } from 'react';

import { FieldErrorList } from '../Other';
import { useFormValidation } from 'views/lib/form-validation';

export default ({ name, label, placeholder, match, required, initialValue = '', onStateChange: setParentState }) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue, errors] = useFormValidation({ initialValue, name, match, required });

  const handleChange = (e) => {
    setValue(e.target.value);
    setInitialized(true);
  }
  const handleBlur = () => setInitialized(true);

  useEffect(() => {
    setParentState({ value, errors })
  }, [value, errors, setParentState]);

  return (
    <div className="form-wrapper">
      <div className="form-field-wrapper">
        <label htmlFor={name}>
          {label}
        </label>

        <textarea
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          className={(initialized && errors.length > 0) ? "validation-false" : ""}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <FieldErrorList initialized={initialized} errors={errors} />
    </div>
  )
};

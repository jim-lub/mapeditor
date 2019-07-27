import React, { useState, useImperativeHandle, forwardRef } from 'react';

import { useFormValidation } from 'views/lib/form-validation/useFormValidation';

export default forwardRef(({ name, label, placeholder , required }, ref) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue, errors] = useFormValidation({
    name,
    required
  });

  useImperativeHandle(ref, () => ({
    type: "textarea",
    name,
    value
  }));

  const handleChange = (e) => {
    setValue(e.target.value);
    setInitialized(true);
  }

  const handleBlur = () => {
    setInitialized(true);
  }

  const renderErrors = errors.map((message, index) => {
    return <li key={index} className="form-error-li">{message}</li>;
  })

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

      <div className="form-error-wrapper">
        {
          (initialized && errors.length > 0)
            ? <ul>{renderErrors}</ul>
            : null
        }
      </div>
    </div>
  )
});

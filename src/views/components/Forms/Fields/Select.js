import React, { useState, useEffect } from 'react';

export default ({ onStateChange: setParentState, label, name, options, initialValue = null }) => {
  const [value, setValue] = useState(initialValue || options[0].value);

  const handleChange = (e) => setValue(e.target.value);
  const handleBlur = () => null;

  useEffect(() => {
    if (setParentState) {
      setParentState({
        value,
        errors: []
      });
    }
  }, [value, setParentState]);

  return (
    <div className="form-wrapper">
      <div className="form-field-wrapper">
        <label htmlFor={name}>
          {label}
        </label>

        <select
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={(value) ? value : ''}
        >
          {
            options.map((option, index) => {
              return (
                <option
                  key={option.value}
                  value={option.value}
                >
                  { option.name }
                </option>
              )
            })
          }
        </select>
      </div>

      <div className="form-error-wrapper">
      </div>
    </div>
  )
}

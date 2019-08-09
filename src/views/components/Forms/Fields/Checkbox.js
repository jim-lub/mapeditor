import React, { useState, useEffect } from 'react';

export default ({ name, label, initialValue = false, onStateChange: setParentState }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => setValue(e.target.checked);
  // const handleBlur = () => setInitialized(true);

  useEffect(() => {
    setParentState({ value, errors: [] })
  }, [value, setParentState]);

  return (
    <div className="form-wrapper">
      <div className="form-field-wrapper">
        <label htmlFor={name}>
          {label}
        </label>

        <label>
          <input
            type="checkbox"
            checked={value}
            onChange={handleChange}
            /* onBlur={handleBlur} */
          />
        </label>
      </div>
    </div>
  )
};

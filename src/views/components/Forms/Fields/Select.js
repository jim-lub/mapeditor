import React, { useState, useEffect } from 'react';

// import { FieldErrorList } from '../Other';

import '../default.module.css';
import fieldStyles from '../fields.module.css';
import formStyles from '../form.module.css';

const defaultOption = {
  name: 'No options found..',
  value: 'No selection found..'
}

export default ({ onStateChange: setParentState, label, name, options = [defaultOption], initialValue = null }) => {
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
    <div className={formStyles.wrapper}>
      <div className={formStyles.fieldWrapper}>
        <label htmlFor={name}>
          {label}
        </label>

        <select
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          value={(value) ? value : ''}
          className={fieldStyles.select}
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
    </div>
  )
}

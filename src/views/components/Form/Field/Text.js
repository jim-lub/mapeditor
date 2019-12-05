import React, { useState, useEffect, useRef } from 'react';

import { concatClassNames } from 'lib/utils';

import { ReactComponent as ErrorIcon } from 'assets/static/icons/form/validation-error.svg';

import '../form-default.module.css';
import fieldStyles from '../form-fields.module.css';

export const Text = ({ name, formData = {}, onBlur, autoFocus = false, onChange }) => {
  const [blurred, setBlurred] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus()
    }
  }, [inputRef, autoFocus])

  const { value = '', label = 'Test', placeholder, disabled, errors = {} } = formData;
  const hasErrors = (Object.keys(errors).length > 0);

  const handleBlur = () => setBlurred(true);

  const handleChange = (e) => {
    onChange({
      name,
      value: e.target.value
    })
  };

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    (hasErrors && blurred) ? fieldStyles.error : null
  ]);

  const errorTextClassNames = concatClassNames([
    fieldStyles.errorTextWrapper,
    (hasErrors && blurred) ? null : fieldStyles.collapsed
  ]);

  return (
    <div className={fieldStyles.wrapper}>
      {
        label &&
        <label>{label}</label>
      }

      <div className={fieldStyles.inputWrapper}>
        <input
          type="text"
          className={inputClassNames}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          disabled={disabled}
          ref={inputRef}
        />

        {
          hasErrors && blurred &&
          <div className={fieldStyles.iconWrapper}>
            <ErrorIcon className={fieldStyles.icon}/>
          </div>
        }
      </div>

      {
        <div className={errorTextClassNames}>
          .
          {
            Object.values(errors).map((message) => message + " ")
          }
        </div>
      }
    </div>
  )
}

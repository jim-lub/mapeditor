import React, { useState, useEffect } from 'react';

import { concatClassNames } from 'lib/utils';

import { ReactComponent as ErrorIcon } from 'assets/static/icons/form/validation-error.svg';

import '../form-default.module.css';
import fieldStyles from '../form-fields.module.css';

export const Text = ({ name, formData, onBlur, onChange }) => {
  const { value = '', label, placeholder, disabled, errors = {} } = formData[name];
  const hasErrors = (Object.keys(errors).length > 0);

  const handleBlur = () => onBlur({ name });

  const handleChange = (e) => onChange({ name, value: e.target.value });

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    (hasErrors) ? fieldStyles.error : null
  ]);

  const errorTextClassNames = concatClassNames([
    fieldStyles.errorTextWrapper,
    (hasErrors) ? null : fieldStyles.collapsed
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
        />

        {
          hasErrors &&
          <div className={fieldStyles.iconWrapper}>
            <ErrorIcon className={fieldStyles.icon}/>
          </div>
        }
      </div>

      {
        <div className={errorTextClassNames}>
          {
            Object.values(errors).map((message) => {
              return (
                <>
                  { message + " " } 
                </>
              )
            })
          }
        </div>
      }
    </div>
  )
}

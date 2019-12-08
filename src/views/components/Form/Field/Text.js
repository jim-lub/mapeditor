import React, { useState, useEffect, useRef } from 'react';

import { concatClassNames } from 'lib/utils';

import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';

import '../form-default.module.css';
import fieldStyles from '../form-fields.module.css';

export const Text = ({ name, formData = {}, autoFocus = false, onBlur, onChange }) => {
  const [blurred, setBlurred] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus()
    }
  }, [inputRef, autoFocus])

  const { value = '', fieldLabel, fieldDesc, placeholder, disabled, errors = {} } = formData[name];
  const hasErrors = (Object.keys(errors).length > 0);

  const handleBlur = () => {
    setBlurred(true);
    onBlur();
  };

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
      <div className={fieldStyles.flexWrapper}>
        {
          fieldLabel &&
          <div className={fieldStyles.labelWrapper}>
            <label>{fieldLabel}</label><br />
            <span className={fieldStyles.fieldDescWrapper}>{fieldDesc}</span>
          </div>
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
              <InvalidIcon className={fieldStyles.icon}/>
            </div>
          }

          {
            !hasErrors && blurred &&
            <div className={fieldStyles.iconWrapper}>
              <ValidIcon className={fieldStyles.icon}/>
            </div>
          }
        </div>
      </div>

      {
        <div className={errorTextClassNames}>
          <ul style={{fontSize: "inherit", color: "inherit"}}>
          {
            Object.values(errors).map(({ message = '', type }, index) =>
              <li key={index} style={{fontSize: "inherit", color: "inherit"}}>{ message || type }</li>
            )
          }
          <li style={{height: 0}}></li>
          </ul>
        </div>
      }
    </div>
  )
}

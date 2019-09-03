import React, { useState, useEffect } from 'react';

import { FieldErrorList } from '../Other';
import { useFormValidation } from 'lib/validation';
import { concatClassNames } from 'lib/utils';

import '../default.module.css';
import fieldStyles from '../fields.module.css';
import formStyles from '../form.module.css';

/**
* Field.Number component with form validation
* @module Number
*
* @param {string} name Field name
* @param {string} label Field label
* @param {string} placeholder Field placeholder
* @param {string} initialValue The field value will be set to this at creation
* @param {string} match Pass the value of the field that the current field should match
* @param {boolean} required - Pass this prop to make the text field required
* @param {function} onStateChange - Pass the `set` function of the useState hook to manage state in the parent component
* @param {object} labelStyle Override the default label styling by passing a style object as a prop
* @param {object} fieldStyle Override the default field styling by passing a style object as a prop
*
* @return {Component} Number
*
*/
export default ({
  name, label, placeholder, initialValue = '', disabled,
  autoFocus, match, required, labelStyle = {}, fieldStyle = {},
  displaySuccess = false, displayErrors = true, onStateChange: setParentState
}) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue, errors] = useFormValidation({ initialValue, name, match, required });

  useEffect(() => {
    if (!setParentState) return;

    setParentState({ value, errors });
  }, [value, errors, setParentState]);

  const handleChange = (e) => {
    const { value } = e.target;

    if (!isNaN(value)) {
      setValue( Number(value).toString() );
    }
    setInitialized(true);
  }

  const handleBlur = () => setInitialized(true);

  const errorMessages = errors.map(error => error.message);

  const textInputClassNames = concatClassNames([
    fieldStyles.number,
    (initialized && errors.length > 0) ? fieldStyles.validationError : "",
    (initialized && errors.length === 0 && displaySuccess) ? fieldStyles.validationSuccess : ""
  ]);

  return (
    <div className={formStyles.wrapper}>
      <div className={formStyles.fieldWrapper}>
        <label htmlFor={name} style={labelStyle}>
          {label}
        </label>

        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          className={textInputClassNames}
          onChange={handleChange}
          onBlur={handleBlur}
          style={fieldStyle}
        />
      </div>

      <FieldErrorList initialized={initialized} errors={errorMessages} />
    </div>
  );
};

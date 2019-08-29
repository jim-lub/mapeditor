import React, { useState, useEffect } from 'react';

import { FieldErrorList } from '../Other';
import { useFormValidation } from 'lib/validation';
import { concatClassNames } from 'lib/utils';

import '../default.module.css';
import fieldStyles from '../fields.module.css';
import formStyles from '../form.module.css';

/**
* Field.TextArea component with form validation
* @module TextArea
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
* @return {Component} TextArea
*
*/
export default ({ name, label, placeholder, initialValue = '', disabled, match, required, labelStyle = {}, fieldStyle = {}, onStateChange: setParentState }) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue, errors] = useFormValidation({ initialValue, name, match, required });

  useEffect(() => {
    if (!setParentState) return;
    
    setParentState({ value, errors });
  }, [value, errors, setParentState]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setInitialized(true);
  };

  const handleBlur = () => setInitialized(true);

  const errorMessages = errors.map(error => error.message);

  const textInputClassNames = concatClassNames([
    fieldStyles.textArea,
    (initialized && errors.length > 0) ? fieldStyles.validationError : ""
  ]);

  return (
    <div className={formStyles.wrapper}>
      <div className={formStyles.fieldWrapper}>
        <label htmlFor={name} style={labelStyle}>
          {label}
        </label>

        <textarea
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

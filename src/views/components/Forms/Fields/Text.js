import React, { useState, useEffect } from 'react';

import { FieldErrorList } from '../Other';
import { useFormValidation } from 'views/lib/form-validation';
import { concatClassNames } from 'lib/utils';

import '../default.module.css';
import fieldStyles from '../fields.module.css';
import formStyles from '../form.module.css';

/***
* @ Field Properties
* @name = required
* @label = required
* @placeholder = optional
* @initialValue = optional
* @match = optional : set a reference to the field it should match
* @required = optional : field is required
* @onStateChange = required : manually create an useState hook and pass the set function
* @labelStyle = optional : override default label styles
* @fieldStyle = optional : override default field styles
*
* Rules other than @match & @required should be set in lib/validation/rules.js
* Custom validation messages can be set in lib/validation/messages.js. If none are specified
* the validation will fallback to generic messages.
***/
export default ({ name, label, placeholder, initialValue = '', match, required, labelStyle = {}, fieldStyle = {}, onStateChange: setParentState }) => {
  const [initialized, setInitialized] = useState(false);
  const [value, setValue, errors] = useFormValidation({ initialValue, name, match, required });

  useEffect(() => {
    setParentState({ value, errors });
  }, [value, errors, setParentState]);

  const handleChange = (e) => {
    setValue(e.target.value);
    setInitialized(true);
  };

  const handleBlur = () => setInitialized(true);

  const textInputClassNames = concatClassNames([
    fieldStyles.text,
    (initialized && errors.length > 0) ? fieldStyles.validationError : ""
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
          className={textInputClassNames}
          onChange={handleChange}
          onBlur={handleBlur}
          style={fieldStyle}
        />
      </div>

      <FieldErrorList initialized={initialized} errors={errors} />
    </div>
  );
};

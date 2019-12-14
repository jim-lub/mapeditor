import React, { useState, useEffect, useRef } from 'react';

import { concatClassNames } from 'lib/utils';

import { Row } from '../components/Row';

import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';

import '../form-default.module.css';
import fieldStyles from '../form-fields.module.css';

export default ({ name, state = {}, autoFocus = false, onBlur, onChange }) => {
  const [blurred, setBlurred] = useState(false);
  const inputRef = useRef(null);
  const { value = '', fieldLabel, fieldDesc, placeholder, disabled, errors = {} } = state[name];
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus()
    }
  }, [inputRef, autoFocus]);

  const handleBlur = () => {
    setBlurred(true);
    onBlur();
  };

  const handleChange = (e) => {
    onChange({
      name,
      value: e.target.value
    });
  };

  const inputClassNames = concatClassNames([
    fieldStyles.input,
    (hasErrors && blurred) ? fieldStyles.error : null
  ]);

  return (
    <Row
      fieldName={name}
      fieldLabel={fieldLabel}
      fieldDesc={fieldDesc}
      blurred={blurred}
      errors={errors}
    >
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
    </Row>
  )

}

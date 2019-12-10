import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';

import { concatClassNames } from 'lib/utils';

import { Row } from '../components/Row';

import { ReactComponent as ValidIcon } from 'assets/static/icons/form/valid.svg';
import { ReactComponent as InvalidIcon } from 'assets/static/icons/form/invalid.svg';

import '../form-default.module.css';
import fieldStyles from '../form-fields.module.css';

export default ({ name, formData = {}, autoFocus = false, onBlur, onChange }) => {
  const [blurred, setBlurred] = useState(false);
  const inputRef = useRef(null);
  const { value = '', fieldLabel, fieldDesc, placeholder, disabled, errors = {} } = formData[name];
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

  const handleChange = (selectedOption) => {
    onChange({
      name,
      value: selectedOption
    });
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isSelected
          ? '#5cb6f7'
          : (state.isFocused) ? '#c9e9ff' : '#ffffff',
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? 'solid 1px transparent' : 'solid 1px #bdbdbd', // grey-400
      outline: 'none',
      boxShadow: state.isFocused ? '0 0 0 2px #5ab0ee' : 'none', // blue-300
      padding: '2px 4px',
      borderRadius: '4px',
      '&:hover': {
        outline: 0,
        border: state.isFocused ? 'solid 1px transparent' : 'solid 1px #bdbdbd',
        boxShadow: 0,
      }
    })
  }

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <Row
      fieldName={name}
      fieldLabel={fieldLabel}
      fieldDesc={fieldDesc}
      blurred={blurred}
      errors={{}}
    >
      <Select
        value={value}
        options={options}
        isDisabled={disabled}
        styles={customStyles}
        classNamePrefix={'react-select'}
        onBlur={handleBlur}
        onChange={handleChange}
      />

      {
        // hasErrors && blurred &&
        // <div className={fieldStyles.iconWrapper}>
        //   <InvalidIcon className={fieldStyles.icon}/>
        // </div>
      }

      {
        // !hasErrors && blurred &&
        // <div className={fieldStyles.iconWrapper}>
        //   <ValidIcon className={fieldStyles.icon}/>
        // </div>
      }
    </Row>
  )

}

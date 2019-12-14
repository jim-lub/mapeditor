import React, { useState } from 'react';
import Select from 'react-select';

import { Row } from '../components/Row';

import '../form-default.module.css';

export default ({ name, state = {}, onBlur, onChange }) => {
  const [blurred, setBlurred] = useState(false);
  const { value = '', fieldLabel, fieldDesc, options, disabled, errors = {} } = state[name];
  const hasErrors = Object.keys(errors).length > 0;

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
      border: state.isFocused
        ? 'solid 1px transparent'
        : (blurred && hasErrors)
          ? 'solid 1px #d32f2f'
          : 'solid 1px #bdbdbd',
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

  return (
    <Row
      fieldName={name}
      fieldLabel={fieldLabel}
      fieldDesc={fieldDesc}
      blurred={blurred}
      errors={errors}
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
    </Row>
  )

}

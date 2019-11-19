import React, { useState, useEffect } from 'react';

import '../redux-form-default.module.css';
import fieldStyles from '../redux-form-fields.module.css';

export const Text = ({ name, placeholder, value = "", disabled, onChange }) => {
  if (!name) return (<span style={{fontWeight: "bold", color: "red"}}>ReduxForm; no `name` value specified.</span>);
  if (!onChange) return (<span style={{fontWeight: "bold", color: "red"}}>ReduxForm; no `onChange` function specified.</span>);

  const handleChange = (e) => onChange({ name, value: e.target.value });

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}

import React from 'react';

export default ({ children = 'Submit', color, form, disabled }) => {

  if (form) {
    return (
      <button
        className={color}
        type="submit"
        form={form}
        disabled={disabled}
      >
        { children }
      </button>
    )
  }

  return null;
};

import React from 'react';

export default ({ children = 'Submit', className, disabled, form}) => {

  if (form) {
    return (
      <button
        className={"blue " + className}
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

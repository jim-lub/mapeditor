import React from 'react';

export default ({ children = 'Confirm', className, disabled, onClick}) => {
  if (onClick) {
    return (
      <button
        className={"blue " + className}
        onClick={onClick}
        disabled={disabled}
      >
        { children }
      </button>
    )
  }

  return null;
};

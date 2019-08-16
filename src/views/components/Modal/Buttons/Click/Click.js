import React from 'react';

export default ({ children = 'Close', color, action, disabled }) => {
  if (action) {
    return (
      <button
        className={color}
        onClick={action}
        disabled={disabled}
      >
        { children }
      </button>
    )
  }

  return null;
};

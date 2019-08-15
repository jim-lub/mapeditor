import React from 'react';

export default ({ children, className, onClose }) => {
  return (
    <button
      className={className}
      onClick={onClose}
    >
      { children }
    </button>
  )
};

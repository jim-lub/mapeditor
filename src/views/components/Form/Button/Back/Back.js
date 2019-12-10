import React from 'react';

export default ({ isDisabled = false, isFirstStep = false, text = ['Back', 'Cancel'], onClick }) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
    >
      {
        (isFirstStep) ? text[1] : text[0]
      }
    </button>
  );
}

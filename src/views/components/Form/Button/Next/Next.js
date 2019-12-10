import React from 'react';

export default ({ isDisabled = false, isLastStep = false, text = ['Next', 'Submit'] }) => {
  return (
    <button
      type="submit"
      className="blue"
      disabled={isDisabled}
    >
      {
        (isLastStep) ? text[1] : text[0]
      }
    </button>
  );
}

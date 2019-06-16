import React from 'react';

export default (props) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.onClick();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit" className="blue">
        Sign In With {props.name}
      </button>
    </form>
  )
}

import React from 'react';

export default ({ id = null, onSubmit, children }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }
  return (
    <form id={id} onSubmit={e => handleSubmit(e)}>
      { children }
    </form>
  );
}

import React from 'react';

export default ({ onSubmit, children }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  }
  return (
    <form onSubmit={e => handleSubmit(e)}>
      { children }
    </form>
  );
}

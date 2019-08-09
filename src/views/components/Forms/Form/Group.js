import React from 'react';

export default ({ children }) => {
  return (
    <form onSubmit={e => { e.preventDefault(); }}>
      { children }
    </form>
  );
}

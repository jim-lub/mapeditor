import React from 'react';

export const DeleteSceneModal = ({ name = "?" }) => {
  return (
    <div>Are you sure you want to delete scene `{name}`? <span style={{fontWeight: "bold"}}>Warning: this action is irreversible!</span></div>
  )
}

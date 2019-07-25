import React from 'react';

export const DeleteProjectModal = ({ name = "?" }) => {
  return (
    <div><h2>Delete project</h2>Are you sure you want to delete project `{name}`? <span style={{fontWeight: "bold"}}>Warning: this action is irreversible!</span></div>
  )
}

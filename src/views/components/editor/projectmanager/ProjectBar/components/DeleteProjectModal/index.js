import React from 'react';

export const DeleteProjectModal = ({ name = "?", childScenes }) => {
  console.log(childScenes)
  return (
    <div>
      <h2>Delete project</h2>
      Are you sure you want to delete project `{name}`?
      <br />
      {
        (childScenes)
        ? `Deleting this project will also trash the following scenes: ${childScenes}`
        : null
      }
      <br />
      <span style={{fontWeight: "bold"}}>Warning: this action is irreversible!</span>
    </div>
  )
}

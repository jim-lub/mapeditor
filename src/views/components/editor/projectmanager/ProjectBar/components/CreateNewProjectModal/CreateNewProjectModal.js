import React, { useState, useImperativeHandle } from 'react';

export default (props, ref) => {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  useImperativeHandle(ref, () => ({
    name: projectName,
    desc: projectDesc
  }));

  return (
    <form>
      <div><h2>Create new project</h2></div>
      <label htmlFor="project_name">Name</label>
      <input type="text" name="project_name" placeholder="Name.." style={{width: "100%"}} value={projectName} onChange={(e) => { setProjectName(e.target.value)}} />

      <label htmlFor="project_description">Description</label>
      <textarea type="text" name="project_description" placeholder="Description.." style={{width: "100%"}} value={projectDesc} onChange={(e) => { setProjectDesc(e.target.value)}} />
    </form>
  )
}

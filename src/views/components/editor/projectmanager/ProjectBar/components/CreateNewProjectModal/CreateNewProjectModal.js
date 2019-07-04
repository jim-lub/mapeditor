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
      <label htmlFor="project_name">NAME</label>
      <input type="text" name="project_name" placeholder="Name" style={{width: "100%"}} value={projectName} onChange={(e) => { setProjectName(e.target.value)}} />

      <label htmlFor="project_description">DESCRIPTION</label>
      <textarea type="text" name="project_description" placeholder="Description" style={{width: "100%"}} value={projectDesc} onChange={(e) => { setProjectDesc(e.target.value)}} />
    </form>
  )
}

import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addProject } from 'actions/editor/projects';
import { getAuthUserSelector } from 'reducers/auth';

const Projects = ({ actions, authUser }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    actions.addProject({
      userId: authUser.uid,
      projectName,
      projectDesc
    });
  }

  return (
    <>
      <div>Projects</div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input style={{margin: 5}}type="text" placeholder="project name" value={projectName} onChange={(e) => setProjectName(e.target.value)}/><br />
          <input style={{margin: 5}}type="text" placeholder="project description" value={projectDesc} onChange={(e) => setProjectDesc(e.target.value)}/><br />
          <button style={{margin: 5, width: 165}}type="submit" className="blue">Add Project</button>
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUserSelector(state) || null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ addProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

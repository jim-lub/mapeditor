import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser } from 'state/ducks/auth';
import { createProject, deleteProject, getProjectsCollection } from 'state/ducks/editor/projects';

import { ProjectNode, CreateNewProjectModal } from './components';
import styles from './projectbar.module.css';

const ProjectBar = ({ actions, authUser, projectsCollection }) => {
  const handleSubmit_newProject = ({ projectName, projectDescription }) => {
    actions.createProject({
      userId: authUser.uid,
      projectName,
      projectDesc: projectDescription
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.projects}>
        {
          projectsCollection.map((project, index) => {
            return <ProjectNode key={index} projectId={project.uid} userId={authUser.uid} name={project.name} description={project.description} deleteAction={actions.deleteProject} />
          })
        }
      </div>
      <div className={styles.optionbar}>
        <CreateNewProjectModal onSubmit={handleSubmit_newProject}/>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    projectsCollection: getProjectsCollection(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createProject, deleteProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBar);

import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser } from 'state/ducks/auth';
import {
  createProject,
  deleteProject,
  getProjectsCollection,
  setActiveProject,
  getActiveProject
} from 'state/ducks/editor/projects';

import { ProjectNode, CreateNewProjectModal } from './components';

import { useModal } from 'views/lib/hooks/useModal';

import styles from './projectbar.module.css';

const ProjectBar = ({ actions, authUser, projectsCollection, activeProjectId }) => {
  const formStateRef = useRef('');

  const [openModal_newProject, CreateNewProjectModalComponent] = useModal({
    type: 'FORM_SINGLE',
    modalWidth: 500,
    ref: formStateRef,
    onSubmitAction: () => handleNewProjectSubmit(),
    Component: CreateNewProjectModal
  });

  const handleNewProjectSubmit = () => {
    console.log(formStateRef.current)
    actions.createProject({
      userId: authUser.uid,
      projectName: formStateRef.current.getName(),
      projectDesc: formStateRef.current.getDesc()
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.projects}>
        {
          projectsCollection.map((project, index) => {
            return <ProjectNode
              key={index}
              projectId={project.uid}
              userId={authUser.uid}
              name={project.name}
              description={project.description}
              deleteAction={actions.deleteProject}
              onSelect={actions.setActiveProject}
              isActive={(activeProjectId === project.uid)}
            />
          })
        }
      </div>
      <div className={styles.optionbar + " clearfix"}>
        <button onClick={(e) => { e.stopPropagation(); openModal_newProject()}} className={styles.optionButton}>+</button>
      </div>

      <CreateNewProjectModalComponent />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    projectsCollection: getProjectsCollection(state),
    activeProjectId: getActiveProject(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createProject, deleteProject, setActiveProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBar);

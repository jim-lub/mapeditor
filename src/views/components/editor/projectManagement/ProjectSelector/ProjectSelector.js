import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser } from 'state/ducks/auth';
import {
  createProject,
  deleteProject,
  setActiveProject,
  getProjects,
  getActiveProjectId,
  getProjectFetchStatus
} from 'state/ducks/editor/projects';

import { ProjectNode, Toolbar } from './components';

import styles from './projectselector.module.css';

const ProjectSelector = ({ authUser, projectsCollection, activeProjectId, projectFetchStatus, actions }) => {
  if (!projectsCollection) {
    
  }

  const RenderProjectNodes = () =>
    projectsCollection.map(project => {
      const { uid, name, description } = project;
      const isActive = (uid === activeProjectId);

      return (
        <ProjectNode
          key={uid}
          name={name}
          description={description}
          projectId={uid}
          userId={authUser.uid}
          isActive={isActive}
          onSelect={actions.setActiveProject}
          onDelete={actions.deleteProject}
        />
      );
  });

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {
          (projectFetchStatus.loading)
            ? <div className={styles.loading}>Loading..</div>
            : null
        }
        <RenderProjectNodes />
      </div>

      <div className={styles.toolbarContainer}>
        <Toolbar
          userId={authUser.uid}
          onCreateProject={actions.createProject}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    projectsCollection: getProjects(state),
    projectFetchStatus: getProjectFetchStatus(state),
    activeProjectId: getActiveProjectId(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createProject, deleteProject, setActiveProject }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);

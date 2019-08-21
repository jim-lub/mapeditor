import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createProject,
  deleteProjectAndChildScenes,
  setActiveProject,
  getProjects,
  getActiveProjectId,
  getProjectById,
  getProjectFetchStatus
} from 'state/ducks/editor/projects';

import {
  getScenes
} from 'state/ducks/editor/scenes';

import { ProjectNode, Toolbar } from './components';

import styles from './projectselector.module.css';

const ProjectSelector = ({ projectsCollection, activeProjectId, getProjectById, projectFetchStatus, sceneCollection, actions }) => {

  const RenderProjectNodes = () =>
    projectsCollection.map(project => {
      const { uid, name, description } = project;
      const isActive = (uid === activeProjectId);

      const childScenes = sceneCollection.filter(data => data.projectId === uid);

      return (
        <ProjectNode
          key={uid}
          name={name}
          description={description}
          projectId={uid}
          isActive={isActive}
          childScenes={childScenes}
          onSelect={actions.setActiveProject}
          onDelete={actions.deleteProjectAndChildScenes}
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
          onCreateProject={actions.createProject}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    projectsCollection: getProjects(state),
    projectFetchStatus: getProjectFetchStatus(state),
    activeProjectId: getActiveProjectId(state),
    getProjectById: (uid) => getProjectById(state, uid),
    sceneCollection: getScenes(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createProject, deleteProjectAndChildScenes, setActiveProject }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);

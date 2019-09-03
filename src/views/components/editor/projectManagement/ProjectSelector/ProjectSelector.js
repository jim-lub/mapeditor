import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAuthUser
} from 'state/ducks/auth';

import {
  listenToProjectChanges,
  createProject,
  deleteProject,
  setActiveProject,
  getProjectDataById,
  getProjectSortOrder,
  getActiveProjectId
} from 'state/ducks/editor/projects';

// import {
//   getScenes
// } from 'state/ducks/editor/scenes';

import { ProjectNode, Toolbar } from './components';

import styles from './projectselector.module.css';

const ProjectSelector = ({ authUser, projectSortOrder, projectsCollection, activeProjectId, getProjectDataById, actions, onDelete, onUpdate }) => {
  useEffect(() => {
    const unsubscribe = actions.listenToProjectChanges({ userId: authUser.uid });

    return () => unsubscribe();
  }, [authUser]);

  const RenderProjectNodes = () =>
    projectSortOrder.map(projectId => {
      const { name, description } = getProjectDataById(projectId);
      const isActive = (projectId === activeProjectId);

      // const childScenes = sceneCollection.filter(data => data.projectId === uid);
      const childScenes = [];

      return (
        <ProjectNode
          key={projectId}
          name={name}
          description={description}
          projectId={projectId}
          isActive={isActive}
          childScenes={childScenes}
          onSelect={actions.setActiveProject}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      );
  });

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {
            /*
          (projectFetchStatus.loading)
            ? <div className={styles.loading}>Loading..</div>
            : null
            */
        }
        <RenderProjectNodes />
      </div>

      <div className={styles.toolbarContainer}>
        <Toolbar />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    projectsCollection: state.editor.projects.collection,
    activeProjectId: getActiveProjectId(state),
    getProjectDataById: (uid) => getProjectDataById(state, uid),
    projectSortOrder: getProjectSortOrder(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createProject, deleteProject, listenToProjectChanges, setActiveProject }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);

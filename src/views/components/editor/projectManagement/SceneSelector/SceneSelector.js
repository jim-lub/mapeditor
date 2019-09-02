import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAuthUser
} from 'state/ducks/auth';

import {
  getActiveProjectId
} from 'state/ducks/editor/projects';

import {
  listenToSceneChanges,
  createScene,
  deleteScene,
  setActiveScene,
  getSceneSortOrderByProjectId,
  getSceneCollection,
  getActiveSceneId,
  getSceneDataById,
  getSetSceneCollectionStatus
} from 'state/ducks/editor/scenes';

import { SceneNode, Toolbar } from './components';

import styles from './sceneselector.module.css';

const SceneSelector = ({ authUser, getSceneSortOrderByProjectId, activeProjectId, activeSceneId, getSceneDataById, status, actions }) => {
  useEffect(() => {
    // console.log(activeProjectId)
    const unsubscribe = actions.listenToSceneChanges({
      userId: authUser.uid
    });

    return () => unsubscribe();
  }, [authUser, activeProjectId, actions]);

  const RenderSceneNodes = () => {
    if (!activeProjectId) return null;
    const sceneSortOrder = getSceneSortOrderByProjectId(activeProjectId);

    return sceneSortOrder
      .map(sceneId => {
        const { name, description } = getSceneDataById(sceneId);
        const isActive = (sceneId === activeSceneId);

        return (
          <SceneNode
            key={sceneId}
            name={name}
            description={description}
            sceneId={sceneId}
            isActive={isActive}
            onSelect={actions.setActiveScene}
            onDelete={actions.deleteScene}
          />
        );

  })};

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {
          (status.collection.loading)
            ? <div className={styles.loading}>Loading..</div>
            : null
        }
        <RenderSceneNodes />
      </div>

      <div className={styles.toolbarContainer}>
        <Toolbar
          onCreateScene={actions.createScene}
          disabled={(!activeProjectId)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    getSceneSortOrderByProjectId: (projectId) => getSceneSortOrderByProjectId(state, projectId),
    activeProjectId: getActiveProjectId(state),
    activeSceneId: getActiveSceneId(state),
    getSceneDataById: (uid) => getSceneDataById(state, uid),
    status: {
      collection: getSetSceneCollectionStatus(state)
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ listenToSceneChanges, createScene, deleteScene, setActiveScene }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SceneSelector);

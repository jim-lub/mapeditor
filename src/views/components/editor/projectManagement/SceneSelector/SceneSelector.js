import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveProjectId
} from 'state/ducks/editor/projects';

import {
  createScene,
  deleteScene,
  setActiveScene,
  getScenes,
  getActiveSceneId,
  getSceneById,
  getSceneFetchStatus
} from 'state/ducks/editor/scenes';

import { SceneNode, Toolbar } from './components';

import styles from './sceneselector.module.css';

const SceneSelector = ({ sceneCollection, activeProjectId, activeSceneId, getSceneById, sceneFetchStatus, actions }) => {

  const RenderSceneNodes = () =>
    sceneCollection
      .filter(scene => scene.projectId === activeProjectId)
      .map(scene => {
        const { uid, name, description } = scene;
        const isActive = (uid === activeSceneId);

        return (
          <SceneNode
            key={uid}
            name={name}
            description={description}
            sceneId={uid}
            isActive={isActive}
            onSelect={actions.setActiveScene}
            onDelete={actions.deleteScene}
          />
        );
  });

  return (
    <div className={styles.container}>
      <div className={styles.scrollContainer}>
        {
          (sceneFetchStatus.loading)
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
    sceneCollection: getScenes(state),
    sceneFetchStatus: getSceneFetchStatus(state),
    activeProjectId: getActiveProjectId(state),
    activeSceneId: getActiveSceneId(state),
    getSceneById: (uid) => getSceneById(state, uid)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createScene, deleteScene, setActiveScene }, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SceneSelector);

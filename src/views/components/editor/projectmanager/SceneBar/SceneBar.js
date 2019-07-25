import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser } from 'state/ducks/auth';

import {
  loadScenesCollection,
  createScene,
  deleteScene,
  getScenesCollection,
  setActiveScene,
  getActiveScene
} from 'state/ducks/editor/scenes';

import {
  getActiveProject
} from 'state/ducks/editor/projects';

import { SceneNode, CreateNewSceneModal } from './components';

import { useModal } from 'views/lib/hooks/useModal';

import styles from './scenebar.module.css';

const SceneBar = ({ actions, authUser, scenesCollection, activeProjectId, activeSceneId }) => {
  const formStateRef = useRef('');

  useEffect(() => {
    if (!activeProjectId) return;

    actions.loadScenesCollection({ projectId: activeProjectId });
  }, [activeProjectId]);

  const [openModal_newScene, CreateNewSceneModalComponent] = useModal({
    type: 'FORM_SINGLE',
    modalWidth: 500,
    ref: formStateRef,
    onSubmitAction: () => handleNewSceneSubmit(),
    Component: CreateNewSceneModal
  });


  const handleNewSceneSubmit = () => {
    actions.createScene({
      userId: authUser.uid,
      projectId: activeProjectId,
      sceneName: formStateRef.current.name,
      sceneDesc: formStateRef.current.desc,
      scenePresets: formStateRef.current.presets
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.scenes}>
        {
          scenesCollection.map((scene, index) => {
            return <SceneNode
              key={index}
              sceneId={scene.uid}
              projectId={activeProjectId}
              userId={authUser.uid}
              name={scene.name}
              description={scene.description}
              deleteAction={actions.deleteScene}
              onSelect={actions.setActiveScene}
              isActive={(activeSceneId === scene.uid)}
            />
          })
        }
      </div>
      <div className={styles.optionbar + " clearfix"}>
        <button
          onClick={(e) => { e.stopPropagation(); openModal_newScene()}}
          className={styles.optionButton}
          disabled={!activeProjectId}
        >
          +
        </button>
      </div>

      <CreateNewSceneModalComponent />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    scenesCollection: getScenesCollection(state),
    activeProjectId: getActiveProject(state),
    activeSceneId: getActiveScene(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ loadScenesCollection, createScene, deleteScene, setActiveScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneBar);

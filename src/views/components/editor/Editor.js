import React from 'react';
import { connect } from 'react-redux';

import { getCurrentScene } from 'state/ducks/editor/map';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import moduleConstants from 'lib/constants/editorModuleConstants';

import { EventListener, ModuleGrid, NoSceneWindow } from './components';
import { Actionbar } from './modules';

import styles from './editor.module.css';

const Component = ({ currentScene }) => {
  const modules = Object.values(moduleTypes).map(type => {
    const { name, Icon, Component } = moduleConstants[type];

    return {
      type,
      name,
      Icon,
      Component
    }
  });

  if (!currentScene.hasOwnProperty('uid')) {
    return <NoSceneWindow />
  }

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.actionbarWrapper}>
          <Actionbar />
        </div>

        <div className={styles.contentWrapper}>
          <ModuleGrid
            modules={modules}
          />
        </div>
      </div>
      <EventListener />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentScene: getCurrentScene(state)
  }
}

export default connect(mapStateToProps)(Component);

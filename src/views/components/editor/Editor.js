import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCurrentScene, initializeMap } from 'state/ducks/editor/map';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import * as moduleTypes from 'lib/constants/editorModuleTypes';
import moduleConstants from 'lib/constants/editorModuleConstants';

import { EventListener, ModuleGrid, NoSceneWindow } from './components';
import { Actionbar } from './modules';
import { Loader } from 'views/components/Loader';

import styles from './editor.module.css';

const Component = ({ currentScene, initializeMapStatus: { initialized = false, loading = true }, actions }) => {
  const contentRef = useRef();

  useEffect(() => {
    if (!currentScene.uid) return;

    if (!initialized) {
      actions.initializeMap({ sceneId: currentScene.uid })
    }
  }, [initialized, currentScene, actions]);

  const getScrollWidth = () => {
    if (contentRef.current) {
      return (contentRef.current.scrollWidth > contentRef.current.clientWidth)
    }
  }

  const modules = () => Object.values(moduleTypes).map(type => {
    const { name, Icon, Component } = moduleConstants[type];

    return {
      type,
      name,
      Icon,
      Component
    }
  });

  if (!currentScene.uid) {
    return <NoSceneWindow />
  }

  if (!initialized || loading) {
    return (
      <div style={{width: "100%", height: "100%", position: 'relative'}}>
        <Loader.Overlay />;
      </div>
    )
  }

  return (
    <>
      <div className={styles.grid}>
        <div className={styles.actionbarWrapper}>
          <Actionbar />
        </div>

        <div ref={contentRef} className={styles.contentWrapper}>
          <ModuleGrid
            modules={modules()}
            hasScrollbar={getScrollWidth}
          />
        </div>
      </div>
      <EventListener />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    currentScene: getCurrentScene(state),
    initializeMapStatus: getRequestStatus(state, { key: 'initializeMap' }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ initializeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

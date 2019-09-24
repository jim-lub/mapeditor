import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveProjectId
} from 'state/ducks/editor/projects';

import {
  getActiveSceneId,
  getSceneDataById
} from 'state/ducks/editor/scenes';

import {
  setCurrentScene
} from 'state/ducks/editor/map';

import { LinkButton } from 'views/components/LinkButton';

const Component = ({ projectId, sceneId, actions }) => {
  if (!projectId || !sceneId) {
    return null;
  }

  return (
    <LinkButton
      onClick={() => {
        actions.setCurrentScene({
          sceneId
        })
      }}
      to="/editor/workspace"
      className="blue"
      >
        Open Scene
      </LinkButton>
  )
}

const mapStateToProps = (state) => {
  return {
    projectId: getActiveProjectId(state),
    sceneId: getActiveSceneId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setCurrentScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

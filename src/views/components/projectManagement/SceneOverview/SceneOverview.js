import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveProjectId
} from 'state/ducks/projects';

import {
  getActiveSceneId,
  getSceneDataById
} from 'state/ducks/scenes';

import {
  getMapProperties,
  setCurrentScene
} from 'state/ducks/editor/map';

import { LinkButton } from 'views/components/LinkButton';

const Component = ({ projectId, sceneId, sceneData, mapProperties, actions }) => {
  if (!projectId || !sceneId || !sceneData || !mapProperties) {
    return null;
  }

  return (
    <>
      <div>
        <LinkButton
          onClick={() => actions.setCurrentScene({ uid: sceneId })}
          to="/editor"
          className="blue"
        >
          Open Scene
        </LinkButton>
      </div>

      <div>
        <Node name="Scene name: " value={sceneData.name} />
        <Node name="Scene description: " value={sceneData.description} />
        <Node name="Created at: " value={(sceneData.createdAt) ? sceneData.createdAt.toString() : "..."} />
        <Node name="Modified at: " value={(sceneData.modifiedAt) ? sceneData.modifiedAt.toString() : "..."} />
      </div>
    </>
  )
}

const Node = ({ name, value }) => {
  return (
    <>
      <span style={{fontWeight: "bold"}}>{ name }</span>
      <span>{ value }</span>

      <br />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    projectId: getActiveProjectId(state),
    sceneId: getActiveSceneId(state),
    sceneData: getSceneDataById(state,
      getActiveSceneId(state)
    ),
    mapProperties: getMapProperties(state,
      getActiveSceneId(state)
    ),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setCurrentScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

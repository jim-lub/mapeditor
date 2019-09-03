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
  setActiveScene,
  getActiveSceneId,
  getSceneDataById,
  getSceneSortOrderByProjectId
} from 'state/ducks/editor/scenes';

import { Node } from '../../components';

const Component = ({
  authUser,
  getSceneDataById, activeProjectId,
  getSceneSortOrderByProjectId, activeSceneId,
  actions, openDeleteModal, openUpdateModal
}) => {
  useEffect(() => actions.listenToSceneChanges({ userId: authUser.uid }), [authUser, actions]);

  const nodeList = getSceneSortOrderByProjectId(activeProjectId).map(sceneId => {
    const { name, description, modifiedAt } = getSceneDataById(sceneId);

    return (
      <Node
        key={sceneId}
        sceneId={sceneId}
        name={name}
        description={description}
        modifiedAt={modifiedAt}
        isActive={(sceneId === activeSceneId)}
        onSelect={actions.setActiveScene}
        openDeleteModal={openDeleteModal}
        openUpdateModal={openUpdateModal}
      />)
  });

  return (
    <>
      { nodeList }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    getSceneDataById: (uid) => getSceneDataById(state, uid),
    getSceneSortOrderByProjectId: (uid) => getSceneSortOrderByProjectId(state, uid),
    activeSceneId: getActiveSceneId(state),
    activeProjectId: getActiveProjectId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ listenToSceneChanges, setActiveScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

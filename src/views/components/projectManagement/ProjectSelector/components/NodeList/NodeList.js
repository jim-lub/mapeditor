import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAuthUser
} from 'state/ducks/auth';

import {
  setActiveProject,
  getProjectDataById,
  getProjectSortOrder,
  getActiveProjectId
} from 'state/ducks/editor/projects';

import {
  getSceneSortOrderByProjectId
} from 'state/ducks/editor/scenes';

import { Node } from '../../components';

const Component = ({
  authUser,
  getProjectDataById, projectSortOrder, activeProjectId,
  getSceneSortOrderByProjectId,
  actions, openDeleteModal, openUpdateModal
}) => {

  const nodeList = projectSortOrder.map(projectId => {
    const { name, description, modifiedAt } = getProjectDataById(projectId);
    const childScenes = getSceneSortOrderByProjectId(projectId).length;

    return (
      <Node
        key={projectId}
        projectId={projectId}
        name={name}
        description={description}
        modifiedAt={modifiedAt}
        isActive={(projectId === activeProjectId)}
        onSelect={actions.setActiveProject}
        openDeleteModal={openDeleteModal}
        openUpdateModal={openUpdateModal}
        childScenes={childScenes}
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
    getProjectDataById: (uid) => getProjectDataById(state, uid),
    getSceneSortOrderByProjectId: (uid) => getSceneSortOrderByProjectId(state, uid),
    projectSortOrder: getProjectSortOrder(state),
    activeProjectId: getActiveProjectId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setActiveProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser } from 'state/ducks/auth';
import { listenToProjectChanges } from 'state/ducks/editor/projects';
import { listenToSceneChanges } from 'state/ducks/editor/scenes';

const Component = ({ authUser = {}, actions }) => {
  const userId = (authUser) ? authUser.uid : null
  useEffect(() => actions.listenToProjectChanges({ userId }), [userId, actions]);
  useEffect(() => actions.listenToSceneChanges({ userId }), [userId, actions]);

  return null;
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ listenToProjectChanges, listenToSceneChanges }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

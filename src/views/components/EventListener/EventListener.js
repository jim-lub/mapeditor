import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAuthUser } from 'state/ducks/auth';
import { listenToSceneChanges } from 'state/ducks/scenes';

const Component = ({ authUser = {}, actions }) => {
  const userId = (authUser) ? authUser.uid : null
  useEffect(() => actions.listenToSceneChanges(), [userId, actions]);

  return null;
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ listenToSceneChanges }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

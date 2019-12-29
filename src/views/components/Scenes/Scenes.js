import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getScenes } from 'state/ducks/scenes';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import { Modal, useModal } from 'views/components/Modal';
import { CreateSceneForm } from './modals';

const Component = ({ scenes, requestStatus }) => {
  const [isVisible_createScene, openModal_createScene, closeModal_createScene] = useModal();

  if (!requestStatus.initialized || requestStatus.loading) {
    return (
      <div>Loading..</div>
    )
  }

  return (
    <div>
      {
        Object.values(scenes).map(({ name }, index) => {
          return (
            <div key={index}>{ name }</div>
          )
        })
      }

      <button onClick={openModal_createScene}>Create scene</button>

      <Modal isVisible={isVisible_createScene} onClose={closeModal_createScene}>
        <CreateSceneForm onClose={closeModal_createScene} />
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    scenes: getScenes(state),
    requestStatus: getRequestStatus(state, { key: 'fetchScenes' }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

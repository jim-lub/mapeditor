import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getScenes } from 'state/ducks/scenes';
import { setCurrentScene } from 'state/ducks/editor/map';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import { Modal, useModal } from 'views/components/Modal';
import { LinkButton } from 'views/components/LinkButton';
import { CreateSceneForm } from './modals';

const Component = ({ scenes, requestStatus, actions }) => {
  const [isVisible_createScene, openModal_createScene, closeModal_createScene] = useModal();

  if (!requestStatus.initialized || requestStatus.loading) {
    return (
      <div>Loading..</div>
    )
  }

  return (
    <div>
      <div style={{padding: 10, backgroundColor: '#e5e5e5', borderBottom: 'solid 1px #c5c5c5'}}>
        <button className="blue" onClick={openModal_createScene}>Create scene</button>
      </div>
      {
        Object.values(scenes).map(({ uid, name }, index) => {
          return (
            <div
              key={index}
              className="clearfix"
              style={{
                float: 'left',
                minWidth: 250,
                margin: 10,
                padding: 5,
                borderRadius: 5,
                border: 'solid 1px #d5d5d5',
                backgroundColor: '#f5f5f5'
              }}
            >
              <div style={{float: 'left', padding: 7}}>
                { name }
              </div>

              <div style={{float: 'right'}}>
                <LinkButton
                  onClick={() => actions.setCurrentScene({ uid })}
                  to="/editor"
                  className="blue"
                  style={{
                    padding: 10,
                    fontSize: 9
                  }}
                >
                  Open
                </LinkButton>
              </div>
            </div>
          )
        })
      }

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
    actions: bindActionCreators({ setCurrentScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';

import { getActiveProjectId } from 'state/ducks/projects';

import { useModal } from 'lib/hooks';

import {
  CreateSceneModal,
  DeleteSceneModal,
  UpdateSceneModal,
} from 'views/components/projectManagement/Modals';

import {
  NodeList,
  Toolbar
} from './components';

import styles from './sceneselector.module.css';

const Component = ({ activeProjectId }) => {
  const [CreateSceneModalComponent, openCreateSceneModal] = useModal(CreateSceneModal);
  const [DeleteSceneModalComponent, openDeleteSceneModal] = useModal(DeleteSceneModal, { width: 400 });
  const [UpdateSceneModalComponent, openUpdateSceneModal] = useModal(UpdateSceneModal);


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.nodeList}>
          <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={500}>
            <NodeList openDeleteModal={openDeleteSceneModal} openUpdateModal={openUpdateSceneModal}/>
          </Scrollbars>
        </div>
        <div className={styles.toolbar}>
          <Toolbar disabled={(!activeProjectId)} openCreateSceneModal={openCreateSceneModal} />
        </div>

      </div>

      <CreateSceneModalComponent />
      <DeleteSceneModalComponent />
      <UpdateSceneModalComponent />
    </>
  )

}

const mapStateToProps = (state) => {
  return {
    activeProjectId: getActiveProjectId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

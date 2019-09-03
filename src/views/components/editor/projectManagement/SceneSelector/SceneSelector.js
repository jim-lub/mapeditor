import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useModal } from 'lib/hooks';

import {
  CreateSceneModal,
  DeleteSceneModal,
  UpdateSceneModal,
} from 'views/components/editor/projectManagement/Modals';

import {
  NodeList,
  Toolbar
} from './components';

import styles from './sceneSelector.module.css';

const Component = () => {
  const [CreateSceneModalComponent, openCreateSceneModal] = useModal(CreateSceneModal);
  const [DeleteSceneModalComponent, openDeleteSceneModal] = useModal(DeleteSceneModal, { width: 400 });
  const [UpdateSceneModalComponent, openUpdateSceneModal] = useModal(UpdateSceneModal);


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.nodeList}>
          <NodeList openDeleteModal={openDeleteSceneModal} openUpdateModal={openUpdateSceneModal}/>
        </div>
        <div className={styles.toolbar}>
          <Toolbar openCreateSceneModal={openCreateSceneModal} />
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

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

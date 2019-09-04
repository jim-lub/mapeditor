import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';

import { useModal } from 'lib/hooks';

import {
  CreateProjectModal,
  DeleteProjectModal,
  UpdateProjectModal,
} from 'views/components/editor/projectManagement/Modals';

import {
  NodeList,
  Toolbar
} from './components';

import styles from './projectSelector.module.css';

const Component = () => {
  const [CreateProjectModalComponent, openCreateProjectModal] = useModal(CreateProjectModal);
  const [DeleteProjectModalComponent, openDeleteProjectModal] = useModal(DeleteProjectModal, { width: 400 });
  const [UpdateProjectModalComponent, openUpdateProjectModal] = useModal(UpdateProjectModal);


  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.nodeList}>
          <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={500}>
            <NodeList openDeleteModal={openDeleteProjectModal} openUpdateModal={openUpdateProjectModal}/>
          </Scrollbars>
        </div>
        <div className={styles.toolbar}>
            <Toolbar openCreateProjectModal={openCreateProjectModal} />
        </div>

      </div>

      <CreateProjectModalComponent />
      <DeleteProjectModalComponent />
      <UpdateProjectModalComponent />
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

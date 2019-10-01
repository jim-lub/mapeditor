import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  deleteLayer
} from 'state/ducks/editor/map';

import { ModalComponent } from 'views/components/Modal';
import Form from 'views/components/Forms';

import styles from '../modal.module.css';

const Component = ({ layerId, layerName, actions, onClose }) => {
  const handleSubmit = () => {
    actions.deleteLayer({ layerId });
    onClose();
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <Form.Group id="deleteLayerForm" onSubmit={handleSubmit}>
            Are you sure you want to delete `{layerName}`? This action <span className={styles.bold}>cannot</span> be undone.
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Delete", color: "red", form: "deleteLayerForm" }}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ deleteLayer }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

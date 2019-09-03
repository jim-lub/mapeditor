import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  deleteScene,
  getSceneDataById,
  getDeleteSceneStatus
} from 'state/ducks/editor/scenes';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { NoSceneFound } from './components';

import styles from '../modal.module.css';

const Component = ({ sceneId, getSceneDataById, deleteSceneStatus, onClose, actions }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [requestStatus, initializeRequest] = useAsyncRequestHelper({ ...deleteSceneStatus, onSuccess: onClose });
  const [sceneData, setSceneData] = useState({});
  const fieldStateArray = [fieldStateName];

  useEffect(() => setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   ), [fieldStateArray]);

  useEffect(() => setSceneData(
    getSceneDataById(sceneId)
  ), [sceneId, getSceneDataById, setSceneData]);

  useEffect(() => setDisableInput( (requestStatus === 'REQUEST') ? true : false ), [requestStatus]);

  const handleSubmit = () => {
    initializeRequest(true);
    actions.deleteScene({
      sceneId
    });
  };

  if (!sceneData) {
    return <NoSceneFound requestStatus={requestStatus} onClose={onClose} />
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Delete scene</h1>
      </div>

      <div className={styles.body}>
        This action <span className={styles.bold}>cannot</span> be undone. This will permanently
        delete the <span className={styles.bold}>{ sceneData.name }</span> scene. Please type in the name of the project to confirm.
      </div>

      <div className={styles.form}>
        <Form.Group id="deleteSceneForm" onSubmit={handleSubmit}>
          <Field.Text
            name="deleteSceneConfirmation"
            onStateChange={setFieldStateName}
            disabled={disableInput}
            match={sceneData.name}
            displaySuccess={true}
            displayErrors={false}
          />
        </Form.Group>
      </div>

    </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: disableInput }}
        buttonRight={{ text: "Delete", color: "red", form: "deleteSceneForm", disabled: disableSubmit || disableInput }}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    getSceneDataById: (uid) => getSceneDataById(state, uid),
    deleteSceneStatus: getDeleteSceneStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ deleteScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

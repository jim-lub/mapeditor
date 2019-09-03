import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createProject,
  getCreateProjectStatus
} from 'state/ducks/editor/projects';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import styles from '../modal.module.css';

const Component = ({ createProjectStatus, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [requestStatus, initializeRequest] = useAsyncRequestHelper({ ...createProjectStatus, onSuccess: onClose });

  const fieldStateArray = [fieldStateName, fieldStateDesc];

  useEffect(() => {
   setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  useEffect(() => setDisableInput( (requestStatus === 'REQUEST') ? true : false ), [requestStatus]);

  const handleSubmit = () => {
    initializeRequest(true);

    actions.createProject({
      name: fieldStateName.value,
      description: fieldStateDesc.value
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create project</h1>

          {
            (disableInput)
              ? <div className={styles.loaderContainerHeader}><Loader.Simple /></div>
              : null
          }
        </div>

        <div className={styles.form}>
          <Form.Group id="createProjectForm" onSubmit={handleSubmit}>
            <Field.Text
              name="projectName"
              label="Name"
              onStateChange={setFieldStateName}
              disabled={disableInput}
              required
            />

            <Field.TextArea
              name="projectDescription"
              label="Description"
              onStateChange={setFieldStateDesc}
              disabled={disableInput}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: disableInput }}
        buttonRight={{ text: "Create", color: "blue", form: "createProjectForm", disabled: disableSubmit || disableInput }}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    createProjectStatus: getCreateProjectStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

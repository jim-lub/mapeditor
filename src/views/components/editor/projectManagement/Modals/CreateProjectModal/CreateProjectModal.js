import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createProject,
  getCreateProjectStatus
} from 'state/ducks/editor/projects';

import { getFieldStateErrors } from 'lib/validation';
import { useAwaitModalSubmit } from 'lib/modal';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import styles from './createprojectmodal.module.css';

const Component = ({ createProjectStatus, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [disabledFormSubmit, setDisabledFormSubmit] = useState(true);
  const [submitStatus, initializeSubmit] = useAwaitModalSubmit({ ...createProjectStatus, onSuccess: onClose });

  const fieldStateArray = [fieldStateName, fieldStateDesc];

  useEffect(() => {
   setDisabledFormSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  const handleSubmit = () => {
    initializeSubmit(true);

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
            (submitStatus === 'REQUEST')
              ? <div className={styles.loaderContainer}><Loader.Simple /></div>
              : null
          }
        </div>

        <div className={styles.form}>
          <Form.Group id="createProjectForm" onSubmit={handleSubmit}>
            <Field.Text
              name="projectName"
              label="Name"
              onStateChange={setFieldStateName}
              disabled={(submitStatus === 'REQUEST')}
              required
            />

            <Field.TextArea
              name="projectDescription"
              label="Description"
              onStateChange={setFieldStateDesc}
              disabled={(submitStatus === 'REQUEST')}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: (submitStatus === 'REQUEST') }}
        buttonRight={{ text: "Create", color: "blue", form: "createProjectForm", disabled: disabledFormSubmit || (submitStatus === 'REQUEST') }}
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

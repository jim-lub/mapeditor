import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveProjectId,
  getProjectDataById
} from 'state/ducks/editor/projects';

import {
  createScene,
  getCreateSceneStatus
} from 'state/ducks/editor/scenes';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import styles from './createscenemodal.module.css';

const Component = ({ projectId = null, activeProjectId, getProjectDataById, createSceneStatus, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [projectData, setProjectData] = useState();
  const [disabledFormSubmit, setDisabledFormSubmit] = useState(true);
  const [submitStatus, initializeSubmit] = useAsyncRequestHelper({ ...createSceneStatus, onSuccess: onClose });

  const fieldStateArray = [fieldStateName, fieldStateDesc];

  useEffect(() => {
   setDisabledFormSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  useEffect(() => {
    const projectData = getProjectDataById(projectId || activeProjectId);

    if (projectData) {
      setProjectData({
        name: projectData.name
      });
    }
  }, [projectId, activeProjectId, getProjectDataById]);

  const handleSubmit = () => {
    initializeSubmit(true);

    actions.createScene({
      projectId: projectId || activeProjectId,
      name: fieldStateName.value,
      description: fieldStateDesc.value
    });
  };

  if (!projectData) {
    return <NoProjectFound onClose={onClose} submitStatus={submitStatus} />
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create scene</h1>

          {(submitStatus === 'REQUEST') ? <div className={styles.loaderContainer}><Loader.Simple /></div> : null}
        </div>

        <div className={styles.form}>
          <Form.Group id="createSceneForm" onSubmit={handleSubmit}>
            <Field.Text
              name="projectName"
              label="Project"
              initialValue={projectData.name}
              disabled={true}
            />

            <Field.Text
              name="sceneName"
              label="Name"
              onStateChange={setFieldStateName}
              disabled={(submitStatus === 'REQUEST')}
              autoFocus={true}
              required
            />

            <Field.TextArea
              name="sceneDescription"
              label="Description"
              onStateChange={setFieldStateDesc}
              disabled={(submitStatus === 'REQUEST')}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: (submitStatus === 'REQUEST') }}
        buttonRight={{ text: "Create", color: "blue", form: "createSceneForm", disabled: disabledFormSubmit || (submitStatus === 'REQUEST') }}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    createSceneStatus: getCreateSceneStatus(state),
    activeProjectId: getActiveProjectId(state),
    getProjectDataById: (uid) => getProjectDataById(state, uid)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

const NoProjectFound = ({ onClose, submitStatus }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create scene</h1>
        </div>

        <div className={styles.warningContainer}>
          All scenes need to be assigned to a project. An error occured while trying to find a project for this scene. Please try again.
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: (submitStatus === 'REQUEST') }}
      />
    </>
  )
}

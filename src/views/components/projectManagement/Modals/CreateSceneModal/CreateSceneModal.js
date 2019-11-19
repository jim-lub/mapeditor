import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveProjectId,
  getProjectDataById
} from 'state/ducks/projects';

import {
  createScene,
  getCreateSceneStatus
} from 'state/ducks/scenes';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import mapPresets from 'lib/constants/mapPresets';

import styles from '../modal.module.css';

const Component = ({ projectId = null, activeProjectId, getProjectDataById, createSceneStatus, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [fieldStatePreset, setFieldStatePreset] = useState();
  const [fieldStateMapColumns, setFieldStateMapColumns] = useState();
  const [fieldStateMapRows, setFieldStateMapRows] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [projectData, setProjectData] = useState();
  const [requestStatus, initializeRequest] = useAsyncRequestHelper({ ...createSceneStatus, onSuccess: onClose });

  const fieldStateArray = [fieldStateName, fieldStateDesc, fieldStateMapColumns, fieldStateMapRows];

  useEffect(() => {
   setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  useEffect(() => setDisableInput( (requestStatus === 'REQUEST') ? true : false ), [requestStatus]);

  useEffect(() => {
    const projectData = getProjectDataById(projectId || activeProjectId);

    if (projectData) {
      setProjectData({
        name: projectData.name
      });
    }
  }, [projectId, activeProjectId, getProjectDataById]);

  const handleSubmit = () => {
    initializeRequest();
    const { allowedTileSizes, segmentSize } = mapPresets[fieldStatePreset.value];

    actions.createScene({
      projectId: projectId || activeProjectId,
      name: fieldStateName.value,
      description: fieldStateDesc.value,
      mapProperties: {
        mapSize: {
          columns: Number(fieldStateMapColumns.value),
          rows: Number(fieldStateMapRows.value)
        },
        segmentSize,
        allowedTileSizes: allowedTileSizes,
      }
    });
  };

  const fillPresetList = () => {
    const list = mapPresets.list.map(preset => {
      const { name, allowedTileSizes } = mapPresets[preset];

      return {
        name: name.toUpperCase() + ": " + allowedTileSizes,
        value: preset
      }
    })

    return list;
  }

  if (!projectData) {
    return <NoProjectFound onClose={onClose} requestStatus={requestStatus} />
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create scene</h1>

          {disableInput ? <div className={styles.loaderContainerHeader}><Loader.Simple /></div> : null}
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
              disabled={disableInput}
              autoFocus={true}
              required
            />

            <Field.TextArea
              name="sceneDescription"
              label="Description"
              onStateChange={setFieldStateDesc}
              disabled={disableInput}
            />

            <Field.Select
              name="scenePreset"
              label="Preset"
              options={fillPresetList()}
              onStateChange={setFieldStatePreset}
              disabled={disableInput}
            />

            <Field.Number
              name="mapSize-columns"
              label="Columns (segments)"
              onStateChange={setFieldStateMapColumns}
              initialValue={1}
              disabled={disableInput}
            />

            <Field.Number
              name="mapSize-rows"
              label="Rows (segments)"
              onStateChange={setFieldStateMapRows}
              initialValue={1}
              disabled={disableInput}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: disableInput }}
        buttonRight={{ text: "Create", color: "blue", form: "createSceneForm", disabled: disableSubmit || disableInput }}
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

const NoProjectFound = ({ onClose }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create scene</h1>
        </div>

        <div className={styles.error}>
          All scenes need to be assigned to a project. An error occured while trying to find a project for this scene. Please try again.
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
      />
    </>
  )
}

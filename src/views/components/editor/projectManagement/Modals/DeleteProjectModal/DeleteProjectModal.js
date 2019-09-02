import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAuthUser
} from 'state/ducks/auth';

import {
  deleteProject,
  getProjectDataById,
  getDeleteProjectStatus
} from 'state/ducks/editor/projects';

import {
  getSceneSortOrderByProjectId,
  getSceneDataById,
} from 'state/ducks/editor/scenes';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import {
  NoProjectFound,
  SceneList
} from './components';

import styles from './deleteprojectmodal.module.css';

const Component = ({ projectId, getProjectDataById, fetchScenesByProjectId, deleteProjectStatus, getSceneDataById, getSceneSortOrderByProjectId, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [requestStatus, initializeRequest] = useAsyncRequestHelper({ ...deleteProjectStatus, onSuccess: onClose });

  const [projectData, setProjectData] = useState({});
  const [childScenes, setChildScenes] = useState({ initialized: false, scenes: []});

  const fieldStateArray = [fieldStateName];

  useEffect(() => {
   setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  useEffect(() => {
    setProjectData( getProjectDataById(projectId) );
  }, [projectId, getProjectDataById, setProjectData]);

  useEffect(() => setDisableInput( (requestStatus === 'REQUEST') ? true : false ), [requestStatus]);

  useEffect(() => {
    const sceneSortOrder = getSceneSortOrderByProjectId(projectId);
    const sceneNames = sceneSortOrder.map(sceneId => getSceneDataById(sceneId));
    setChildScenes( {
      initialized: true,
      scenes: sceneNames
    } );
  }, [projectId, getSceneDataById, getSceneSortOrderByProjectId]);

  const handleSubmit = () => {
    initializeRequest(true);

    actions.deleteProject({
      projectId
    });
  };

  if (!projectData) {
    return <NoProjectFound onClose={onClose} />
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Delete project</h1>

          {
            disableInput
              ? <div className={styles.loader}><Loader.Simple /></div>
              : null
          }
        </div>

        <SceneList {...childScenes}/>

        <div className={styles.message}>
          This action <span className={styles.bold}>cannot</span> be undone. This will permanently
          delete the <span className={styles.bold}>{ projectData.name }</span> project and all it's child scenes.
          Please type in the name of the project to confirm.
        </div>

        <div className={styles.form}>
          <Form.Group id="deleteProjectForm" onSubmit={handleSubmit}>
            <Field.Text
              name="deleteProjectConfirmation"
              onStateChange={setFieldStateName}
              disabled={disableInput}
              match={projectData.name}
              displayErrors={false}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose, disabled: disableInput }}
        buttonRight={{ text: "Delete", color: "red", form: "deleteProjectForm", disabled: disableSubmit || disableInput }}
      />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    authUser: getAuthUser(state),
    getProjectDataById: (uid) => getProjectDataById(state, uid),
    createProjectStatus: getDeleteProjectStatus(state),
    getSceneSortOrderByProjectId: (projectId) => getSceneSortOrderByProjectId(state, projectId),
    getSceneDataById: (uid) => getSceneDataById(state, uid),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ deleteProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

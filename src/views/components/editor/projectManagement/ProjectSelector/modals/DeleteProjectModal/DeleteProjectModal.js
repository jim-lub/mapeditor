import React, { useState, useEffect } from 'react';

import { getFieldStateErrors } from 'lib/validation';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms'

import styles from './deleteprojectmodal.module.css';

export default ({ projectId, projectName, childScenes, onDelete, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [disabled, setDisabled] = useState(true);
  const fieldStateArray = [fieldStateName];

  const handleDelete = () => {
    onDelete({ projectId });
    onClose();
  };

  useEffect(() => {
   setDisabled(
     (getFieldStateErrors(fieldStateArray).length > 0)
      ? true
      : false
   );
  }, [fieldStateArray]);

  const RenderScenesList = () => {
    if (childScenes.length === 0) return null;

    return (
      <div className={styles.scenesList}>
        <span style={{fontWeight: "bold"}}>The following scene(s) will also be deleted:</span>
        <ul>
          {
            childScenes.map(scene => {
              return (
                <li key={scene.uid}>{ scene.name }</li>
              )
            })
          }
        </ul>
      </div>
    )
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}><h1>Delete project</h1></div>
        <RenderScenesList />

        <div className={styles.warning}>
          <div className={styles.message}>
            This action <span className={styles.bold}>cannot</span> be undone. This will permanently
            delete the <span className={styles.bold}>{ projectName }</span> project and all it's child scenes.
            Please type in the name of the project to confirm.
          </div>

          <div className={styles.confirmationForm}>
            <Form.Group id="deleteProjectForm" onSubmit={handleDelete}>
              <Field.Text
                name="deleteProjectConfirmation"
                onStateChange={setFieldStateName}
                match={projectName}
                displayErrors={false}
              />
            </Form.Group>
          </div>

        </div>
      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Delete", color: "red", form: "deleteProjectForm", disabled }}
      />
    </>
  );
};

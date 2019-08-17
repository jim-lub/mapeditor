import React, { useState, useEffect } from 'react';

import { getFieldStateErrors } from 'lib/validation';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms'

import styles from './deleteprojectmodal.module.css';

export default ({ userId, projectId, projectName, onDelete, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [disabled, setDisabled] = useState(false);
  const fieldStateArray = [fieldStateName];

  const handleDelete = () => {
    onDelete({ userId, projectId });
    onClose();
  };

  useEffect(() => {
   setDisabled(
     (getFieldStateErrors(fieldStateArray).length > 0)
      ? true
      : false
   );
  }, [fieldStateArray]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}><h1>Delete project</h1></div>
        <div className={styles.scenesList}>
          <span style={{fontWeight: "bold"}}>The following scene(s) will also be deleted:</span>
          <ul>
            <li>The constructor</li>
            <li>The assembler</li>
            <li>The smelter</li>
          </ul>
        </div>

        <div className={styles.warning}>
          <div className={styles.message}>
            This action <span className={styles.bold}>cannot</span> be undone. This will permanently
            delete the <span className={styles.bold}>{ projectName }</span> project.
            Please type in the name of the project to confirm.
          </div>

          <div className={styles.confirmationForm}>
            <Form.Group id="deleteProjectForm" onSubmit={handleDelete}>
              <Field.Text
              name="deleteProjectConfirmation"
              onStateChange={setFieldStateName}
              match={projectName}
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

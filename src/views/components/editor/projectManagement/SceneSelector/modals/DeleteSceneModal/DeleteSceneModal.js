import React, { useState, useEffect } from 'react';

import { getFieldStateErrors } from 'lib/validation';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms'

import styles from './deletescenemodal.module.css';

export default ({ sceneId, sceneName, onDelete, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [disabled, setDisabled] = useState(true);
  const fieldStateArray = [fieldStateName];

  const handleDelete = () => {
    onDelete({ sceneId });
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
        <div className={styles.header}><h1>Delete scene</h1></div>

        <div className={styles.warning}>
          <div className={styles.message}>
            This action <span className={styles.bold}>cannot</span> be undone. This will permanently
            delete the <span className={styles.bold}>{ sceneName }</span> scene.
            Please type in the name of the scene to confirm.
          </div>

          <div className={styles.confirmationForm}>
            <Form.Group id="deleteSceneForm" onSubmit={handleDelete}>
              <Field.Text
                name="deleteSceneConfirmation"
                onStateChange={setFieldStateName}
                match={sceneName}
                displayErrors={false}
              />
            </Form.Group>
          </div>

        </div>
      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Delete", color: "red", form: "deleteSceneForm", disabled }}
      />
    </>
  );
};

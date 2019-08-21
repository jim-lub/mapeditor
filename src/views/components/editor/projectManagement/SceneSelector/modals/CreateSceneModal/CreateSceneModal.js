import React, { useState, useEffect } from 'react';

import { getFieldStateErrors } from 'lib/validation';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms'

import styles from './createscenemodal.module.css';

export default ({ onCreateScene, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [disabled, setDisabled] = useState(true);
  const fieldStateArray = [fieldStateName, fieldStateDesc];

  const handleSubmit = () => {
    onCreateScene({
      name: fieldStateName.value,
      description: fieldStateDesc.value
    });

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
        <div className={styles.header}><h1>Create project</h1></div>

        <div className={styles.form}>
          <Form.Group id="createSceneForm" onSubmit={handleSubmit}>
            <Field.Text
              name="sceneName"
              label="Name"
              onStateChange={setFieldStateName}
              required
            />

            <Field.TextArea
              name="sceneDescription"
              label="Description"
              onStateChange={setFieldStateDesc}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Create", color: "blue", form: "createSceneForm", disabled }}
      />
    </>
  );
};

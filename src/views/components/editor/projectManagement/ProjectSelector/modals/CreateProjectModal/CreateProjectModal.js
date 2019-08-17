import React, { useState, useEffect } from 'react';

import { getFieldStateErrors } from 'lib/validation';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms'

import styles from './createprojectmodal.module.css';

export default ({ userId, onCreateProject, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [disabled, setDisabled] = useState(true);
  const fieldStateArray = [fieldStateName, fieldStateDesc];

  const handleSubmit = () => {
    onCreateProject({
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
          <Form.Group id="createProjectForm" onSubmit={handleSubmit}>
            <Field.Text
              name="projectName"
              label="Name"
              onStateChange={setFieldStateName}
              required
            />

            <Field.TextArea
              name="projectDescription"
              label="Description"
              onStateChange={setFieldStateDesc}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Create", color: "blue", form: "createProjectForm", disabled }}
      />
    </>
  );
};

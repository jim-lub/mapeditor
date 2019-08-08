import React, { useState, useEffect } from 'react';
import { ProjectBar, SceneBar } from 'views/components/editor/projectmanager'

import styles from './projectmanager.module.css';

import Form, { Field } from 'views/components/Forms';
import { monitorFieldStateErrors } from 'views/lib/form-validation';

export default () => {
  const [nameFieldState, setNameFieldState] = useState({});
  const [descFieldState, setDescFieldState] = useState({});
  const [formDisable, setFormDisable] = useState(false);
  const fieldStateGroup = [nameFieldState, descFieldState];

  const handleSubmit = () => {
    console.log(nameFieldState, descFieldState);
  }

  useEffect(() => {
    monitorFieldStateErrors(fieldStateGroup, (isError) => setFormDisable(!!isError));
  }, [fieldStateGroup]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.projectBarWrapper}><ProjectBar /></div>
      <div className={styles.sceneBarWrapper}><SceneBar /></div>
      <div>
        <div style={{width: 500}}>
          <Form.Group>
            <Field.Text
              name="projectName"
              label="Name"
              placeholder="project name.."
              onStateChange={setNameFieldState}
              required
            />

            <Field.Text
              name="projectDesc"
              label="Description"
              placeholder="project description.."
              onStateChange={setDescFieldState}
            />

          </Form.Group>

          <button
            onClick={handleSubmit}
            disabled={formDisable}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

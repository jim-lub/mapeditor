import React, { useRef } from 'react';
import { ProjectBar, SceneBar } from 'views/components/editor/projectmanager'

import styles from './projectmanager.module.css';

import Form, { Field } from 'views/components/Forms';

export default () => {
  const nameFieldRef = useRef('');
  const descFieldRef = useRef('');
  const numberFieldRef = useRef('');

  const handleSubmit = () => {
    console.log(nameFieldRef.current);
    console.log(descFieldRef.current);
  }

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
              ref={nameFieldRef}
              required
            />

            <Field.TextArea
              name="projectDesc"
              label="Description"
              placeholder="project description.."
              ref={descFieldRef}
            />

            <Field.Number
              name="projectNumber"
              label="Number"
              placeholder=""
              ref={numberFieldRef}
              required
            />

          </Form.Group>

          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

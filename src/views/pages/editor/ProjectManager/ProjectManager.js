import React, { useState, useEffect } from 'react';
import { ProjectBar, SceneBar } from 'views/components/editor/projectmanager'

import styles from './projectmanager.module.css';

import Form, { Field } from 'views/components/Forms';
import { monitorFieldStateErrors } from 'views/lib/form-validation';

export default () => {
  const [nameFieldState, setNameFieldState] = useState({});
  const [nameFieldState2, setNameFieldState2] = useState({});
  const [descFieldState, setDescFieldState] = useState({});
  const [numberFieldState, setNumberFieldState] = useState({ value: 20 });
  const [checkboxFieldState, setCheckboxFieldState] = useState({ value: true });
  const [formDisable, setFormDisable] = useState(false);
  const fieldStateGroup = [nameFieldState, descFieldState, numberFieldState];

  const handleSubmit = () => {
    console.log("nameField: ", nameFieldState);
    console.log("descField: ", descFieldState);
    console.log("numberField: ", numberFieldState);
    console.log("checkboxField: ", checkboxFieldState);
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
          <Form.Group onSubmit={handleSubmit}>
            <Field.Text
              name="projectName"
              label="Name"
              placeholder="project name.."
              onStateChange={setNameFieldState}
              required
            />

            <Field.Text
              name="projectName2"
              label="Name 2"
              placeholder="project name2.."
              onStateChange={setNameFieldState2}
              required
              match={nameFieldState.value}
            />

            <Field.Select
              name="projectSelect"
              label="Select"
              placeholder="project selection.."
              onStateChange={setDescFieldState}
              options={[
                {name: "Default (1)", value: "default_1"},
                {name: "Default (2)", value: "default_2"},
                {name: "Default (3)", value: "default_3"}
              ]}
              initialValue="default_5"
            />

            <Field.Number
              name="projectNumber"
              label="Number"
              placeholder={0}
              initialValue={numberFieldState.value}
              onStateChange={setNumberFieldState}
            />

            <Field.Checkbox
              name="projectCheckbox"
              label="Checkbox"
              initialValue={checkboxFieldState.value}
              onStateChange={setCheckboxFieldState}
              required
            />

            <button
              type="submit"
              disabled={formDisable}
            >
            Submit
            </button>

          </Form.Group>

        </div>
      </div>
    </div>
  )
}

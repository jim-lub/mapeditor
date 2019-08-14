import React, { useState, useEffect } from 'react';
import { ProjectBar, SceneBar } from 'views/components/editor/projectmanager'

import styles from './projectmanager.module.css';

import Form, { Field } from 'views/components/Forms';
import useModal from 'lib/modal/useModal';

export default () => {
  const [ModalComponent, openModal] = useModal(CustomModalComponent, { id: 23123, name: 'modalComponentNameBrah' });

  const [nameFieldState, setNameFieldState] = useState({});
  const [descFieldState, setDescFieldState] = useState({});
  const [formDisable, setFormDisable] = useState(false);

  const handleSubmit = () => {

  }

  const handleModalVisibility = () => {
    openModal();
  };

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

            <Field.Password
              name="projectName"
              label="Name"
              placeholder="project name.."
              onStateChange={setDescFieldState}
              required
            />

            <button
              type="submit"
              disabled={formDisable}
            >
            Submit
            </button>

          </Form.Group>

          <button className="blue" onClick={handleModalVisibility}>Open Modal</button>

          <ModalComponent />
        </div>
      </div>
    </div>
  )
}

const CustomModalComponent = ({ id, name }) => {
  return (
    <div>
      <h1>Custom Modal Component : { name } : { id }</h1>
    </div>
  )
}

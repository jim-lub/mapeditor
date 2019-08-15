import React, { useState, useEffect } from 'react';

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
      {/*
      <div className={styles.projectBarWrapper}><ProjectBar /></div>
      <div className={styles.sceneBarWrapper}><SceneBar /></div>
      */}
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
};

const CustomModalComponent = ({ id, name, onClose }) => {
  const [disable, setDisable] = useState(false);
  const [nameFieldState, setNameFieldState] = useState({});
  const [nameFieldState2, setNameFieldState2] = useState({});
  const [nameFieldState3, setNameFieldState3] = useState({});
  const fieldStateGroup = [nameFieldState, nameFieldState2, nameFieldState3];

  const handleSubmit = () => {
    console.log(nameFieldState);
  }

  useEffect(() => {
    const errors = [];

    fieldStateGroup.forEach(state => {
      if (state.hasOwnProperty('errors')) {
        if (state.errors.length > 0) {
          errors.push(...state.errors)
        }
      }
    })

    if (errors.length > 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [fieldStateGroup])

  return (
    <>
      <div style={{padding: 10}}>
        <h1>Custom Modal Component</h1><br />
        <Form.Group id="newProjectForm" onSubmit={handleSubmit}>
          <Field.Text
            name="projectName"
            label="Name"
            placeholder="project name.."
            onStateChange={setNameFieldState}
            required
          />

          <Field.TextArea
            name="projectName"
            label="Description"
            placeholder="project name.."
            onStateChange={setNameFieldState2}
            required
          />

          <Field.Number
            name="projectName"
            label="Segments"
            placeholder="project name.."
            onStateChange={setNameFieldState3}
            required
          />
        </Form.Group>
      </div>
    </>
  )
};

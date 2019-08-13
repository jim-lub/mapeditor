import React, { useState, useEffect, useImperativeHandle } from 'react';

import Form, { Field } from 'views/components/Forms';

export default (props, ref) => {
  const [nameFieldRef, setNameFieldRef] = useState({});
  const [descFieldRef, setDescFieldRef] = useState({});
  const [formDisable, setFormDisable] = useState(false);
  const fieldStateGroup = [nameFieldRef, descFieldRef];

  const submitForm = () => console.log('new project created');

  useImperativeHandle(ref, () => ({
    getName: () => nameFieldRef.value,
    getDesc: () => descFieldRef.value,
  }));

  return (
    <div>
      <div style={{marginBottom: 10}}><h2>Create new project</h2></div>
      <div>
        <Form.Group onSubmit={submitForm}>
          <Field.Text
            name="projectName"
            label="Name*"
            placeholder="project name.."
            onStateChange={setNameFieldRef}
            required
          />

          <Field.Text
            name="projectDesc"
            label="Description"
            placeholder="project description.."
            onStateChange={setDescFieldRef}
          />

          <button type="submit" disabled={formDisable}>Submit</button>
        </Form.Group>
      </div>
    </div>
  )
}

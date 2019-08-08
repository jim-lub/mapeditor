import React, { useState, useEffect, useImperativeHandle } from 'react';

import Form, { Field } from 'views/components/Forms';
import { monitorFieldStateErrors } from 'views/lib/form-validation';

export default (props, ref) => {
  const [nameFieldRef, setNameFieldRef] = useState({});
  const [descFieldRef, setDescFieldRef] = useState({});
  const [formDisable, setFormDisable] = useState(false);
  const fieldStateGroup = [nameFieldRef, descFieldRef];

  useEffect(() => {
    monitorFieldStateErrors(fieldStateGroup, (isError) => setFormDisable(!!isError));
  }, [fieldStateGroup]);

  useImperativeHandle(ref, () => ({
    getName: () => nameFieldRef.value,
    getDesc: () => descFieldRef.value,
  }));

  return (
    <div>
      <div style={{marginBottom: 10}}><h2>Create new project</h2></div>
      <div>
        <Form.Group>
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

        </Form.Group>
      </div>
    </div>
  )
}

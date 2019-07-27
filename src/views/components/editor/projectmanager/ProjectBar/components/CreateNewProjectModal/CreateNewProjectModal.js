import React, { useRef, useImperativeHandle } from 'react';

import Form, { Field } from 'views/components/Forms';

export default (props, ref) => {
  const projectNameRef = useRef('');
  const projectDescRef = useRef('');

  useImperativeHandle(ref, () => ({
    getName: () => projectNameRef.current.value,
    getDesc: () => projectDescRef.current.value,
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
            ref={projectNameRef}
            required
          />

          <Field.TextArea
            name="projectDesc"
            label="Description"
            placeholder="project description.."
            ref={projectDescRef}
          />

        </Form.Group>
      </div>
    </div>
  )
}

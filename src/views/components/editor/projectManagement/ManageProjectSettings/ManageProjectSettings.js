import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getProjectDataById,
  getActiveProjectId
} from 'state/ducks/editor/_projects';

import Form, { Field } from 'views/components/Forms';
import { ModalComponent } from 'views/components/Modal';

const Component = ({ activeProjectId, getProjectDataById, actions }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const disabled = false;

  const handleUpdate = () => {
    console.log('update!')
  }

  useEffect(() => {
    const projectData = getProjectDataById( activeProjectId );

    if (projectData) {
      console.log("Project Data: ", projectData);
    }

  }, [activeProjectId, getProjectDataById]);

  return (
    <div>
      <Form.Group id="updateProjectForm" onSubmit={handleUpdate}>
        <Field.Text
          name="projectName"
          onStateChange={setFieldStateName}
          displayErrors={false}
        />

        <Field.Text
          name="projectDescription"
          onStateChange={setFieldStateDesc}
          displayErrors={false}
        />
      </Form.Group>

      <ModalComponent.Footer
        buttonRight={{ text: "Update", color: "blue", form: "updateProjectForm", disabled }}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeProjectId: getActiveProjectId(state),
    getProjectDataById: (uid) => getProjectDataById(state, uid)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

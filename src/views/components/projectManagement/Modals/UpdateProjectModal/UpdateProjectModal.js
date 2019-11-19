import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateProject,
  getProjectDataById,
  getUpdateProjectStatus
} from 'state/ducks/projects';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import styles from '../modal.module.css';

const Component = ({ projectId, projectData, updateProjectStatus, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [requestStatus, initializeRequest] = useAsyncRequestHelper({ ...updateProjectStatus, onSuccess: onClose });
  const fieldStateArray = [fieldStateName, fieldStateDesc];

  useEffect(() => {
   setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  useEffect(() => setDisableInput( (requestStatus === 'REQUEST') ? true : false ), [requestStatus]);

  const handleSubmit = () => {
    initializeRequest();
    actions.updateProject({
      projectId,
      name: fieldStateName.value,
      description: fieldStateDesc.value
    })
  }

 return (
   <>
     <div className={styles.container}>
       <div className={styles.header}>
         <h1>Edit project</h1>

         {
           (disableInput)
             ? <div className={styles.loaderContainerHeader}><Loader.Simple /></div>
             : null
         }
       </div>

       <div className={styles.form}>
         <Form.Group id="updateProjectForm" onSubmit={handleSubmit}>
           <Field.Text
             name="projectName"
             label="Name"
             initialValue={projectData.name}
             onStateChange={setFieldStateName}
             disabled={disableInput}
             autoFocus={true}
             required
           />

           <Field.TextArea
             name="projectDescription"
             label="Description"
             initialValue={projectData.description}
             onStateChange={setFieldStateDesc}
             disabled={disableInput}
           />
         </Form.Group>
       </div>

     </div>

     <ModalComponent.Footer
       buttonLeft={{ text: "Cancel", action: onClose, disabled: disableInput }}
       buttonRight={{ text: "Update", color: "blue", form: "updateProjectForm", disabled: disableSubmit || disableInput }}
     />
   </>
 )
}

const mapStateToProps = (state, ownProps) => {
  return {
    projectData: getProjectDataById(state, ownProps.projectId),
    updateProjectStatus: getUpdateProjectStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateProject }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

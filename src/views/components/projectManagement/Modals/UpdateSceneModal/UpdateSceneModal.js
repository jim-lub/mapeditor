import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  updateScene,
  getSceneDataById,
  getUpdateSceneStatus
} from 'state/ducks/scenes';

import { getFieldStateErrors } from 'lib/validation';
import { useAsyncRequestHelper } from 'lib/hooks';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';
import { Loader } from 'views/components/Loader';

import styles from '../modal.module.css';

const Component = ({ sceneId, sceneData, updateSceneStatus, actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateDesc, setFieldStateDesc] = useState();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [requestStatus, initializeRequest] = useAsyncRequestHelper({ ...updateSceneStatus, onSuccess: onClose });
  const fieldStateArray = [fieldStateName, fieldStateDesc];

  useEffect(() => {
   setDisableSubmit(
     ( getFieldStateErrors(fieldStateArray).length > 0 ) ? true : false
   );
  }, [fieldStateArray]);

  useEffect(() => setDisableInput( (requestStatus === 'REQUEST') ? true : false ), [requestStatus]);

  const handleSubmit = () => {
    initializeRequest();
    actions.updateScene({
      sceneId,
      name: fieldStateName.value,
      description: fieldStateDesc.value
    })
  }

 return (
   <>
     <div className={styles.container}>
       <div className={styles.header}>
         <h1>Edit scene</h1>

         {
           (disableInput)
             ? <div className={styles.loaderContainerHeader}><Loader.Simple /></div>
             : null
         }
       </div>

       <div className={styles.form}>
         <Form.Group id="updateSceneForm" onSubmit={handleSubmit}>
           <Field.Text
             name="sceneName"
             label="Name"
             initialValue={sceneData.name}
             onStateChange={setFieldStateName}
             disabled={disableInput}
             autoFocus={true}
             required
           />

           <Field.TextArea
             name="sceneDescription"
             label="Description"
             initialValue={sceneData.description}
             onStateChange={setFieldStateDesc}
             disabled={disableInput}
           />
         </Form.Group>
       </div>

     </div>

     <ModalComponent.Footer
       buttonLeft={{ text: "Cancel", action: onClose, disabled: disableInput }}
       buttonRight={{ text: "Update", color: "blue", form: "updateSceneForm", disabled: disableSubmit || disableInput }}
     />
   </>
 )
}

const mapStateToProps = (state, ownProps) => {
  return {
    sceneData: getSceneDataById(state, ownProps.sceneId),
    updateSceneStatus: getUpdateSceneStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ updateScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

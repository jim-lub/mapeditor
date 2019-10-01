import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  createLayer
} from 'state/ducks/editor/map';

import * as layerTypes from 'lib/constants/layerTypes';
import layerConstants from 'lib/constants/layerConstants';

import { ModalComponent } from 'views/components/Modal';
import Form, { Field } from 'views/components/Forms';

import styles from '../modal.module.css';

const Component = ({ actions, onClose }) => {
  const [fieldStateName, setFieldStateName] = useState();
  const [fieldStateLayerType, setFieldStateLayerType] = useState();

  const handleSubmit = () => {
    actions.createLayer({
      name: fieldStateName.value,
      layerType: fieldStateLayerType.value
    });
    onClose();
  }

  const layerTypeOptions = () => Object.values(layerTypes)
    .map(layerType => {
      const layerProperties = layerConstants[layerType];

      return {
        name: layerProperties.name,
        value: layerType,
        disabled: layerProperties.disabled
      }
    })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <Form.Group id="createLayerForm" onSubmit={handleSubmit}>

            <Field.Text
              name="layerName"
              label="Name"
              onStateChange={setFieldStateName}
              autoFocus={true}
            />

            <Field.Select
              name="layerType"
              label="Type"
              options={layerTypeOptions()}
              onStateChange={setFieldStateLayerType}
            />
          </Form.Group>
        </div>

      </div>

      <ModalComponent.Footer
        buttonLeft={{ text: "Cancel", action: onClose }}
        buttonRight={{ text: "Create", color: "blue", form: "createLayerForm" }}
      />
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createLayer }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Component);

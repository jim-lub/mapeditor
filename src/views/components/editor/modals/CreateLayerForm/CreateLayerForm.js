import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createLayer } from 'state/ducks/editor/layers';

import createLayerFormSchema from './create-layer-form-schema';

import { Form, Field } from 'views/components/Form';
import { ModalComponents } from 'views/components/Modal';

import styles from './create-layer-form.module.css';

const Component = ({ actions, onClose }) => {
  const handleSubmit = (data) => {
    actions.createLayer({
      layerName: data.default['layer-name'].value,
      layerType: data.default['layer-type'].value.value,
      tileSize: {
        width: data.default['tile-size-width'].value.value,
        height: data.default['tile-size-height'].value.value
      }
    });

    onClose();
  }

  return (
    <Form id="create-layer-form" schema={createLayerFormSchema()} components={[<CreateLayerForm />]} onSubmit={handleSubmit}>
      {
        ({ Component, back, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div>
              <div className={styles.warning}>
                Tilesize is fixed at 64 by 64 pixels until the tileset uploader is complete
              </div>

              <div className={styles.componentWrapper}>
                { Component }
              </div>

              <ModalComponents.DefaultFooter
                buttonLeft={
                  () => (
                    <button type="button" onClick={onClose}>
                      Cancel
                    </button>
                  )
                }

                buttonRight={
                  () => (
                    <button type="submit" disabled={disableNextButton} className="blue">
                      Create
                    </button>
                  )
                }
              />
            </div>
          )
        }
      }
    </Form>
  )
}

const CreateLayerForm = ({ provided, state }) => {
  return (
    <>
      <Field.Text name="layer-name" {...provided} />
      <Field.Select name="layer-type" {...provided} />
      <Field.Select name="tile-size-width" {...provided} />
      <Field.Select name="tile-size-height" {...provided} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createLayer }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

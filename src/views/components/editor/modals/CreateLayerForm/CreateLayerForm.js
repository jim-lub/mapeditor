import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createLayer } from 'state/ducks/editor/layers';

import createLayerFormSchema from './create-layer-form-schema';

import { Form, Field, FormComponent } from 'views/components/Form';
import { ModalComponents } from 'views/components/Modal';

import styles from './create-layer-form.module.css';

const Component = ({ actions, onClose }) => {
  const handleSubmit = ({ state }) => {
    console.log(state)
    actions.createLayer({
      layerName: state['layer-name'],
      layerType: state['layer-type'],
      tileSize: {
        width: state['tile-size-width'],
        height: state['tile-size-height']
      }
    });

    onClose();
  }

  return (
    <Form uid="create-layer-form" schema={createLayerFormSchema()} onSubmit={handleSubmit}>
      {
        ({ state, provided, submitDisabled }) => {
          return (
            <div>
              <div className={styles.warning}>
                Tilesize is fixed at 64 by 64 pixels until the tileset uploader is complete
              </div>

              <div className={styles.componentWrapper}>
                <FormComponent.Row forField="layer-name" {...provided}>
                  <Field.Text field="layer-name" autoFocus {...provided} />
                </FormComponent.Row>

                <FormComponent.Row forField="layer-type" {...provided}>
                  <Field.Select field="layer-type" {...provided} />
                </FormComponent.Row>

                <FormComponent.Row forField="tile-size-width" disableErrorMessages {...provided}>
                  <div style={{display: 'flex'}}>
                    <div style={{flex: 1, marginRight: 10}}>
                      <Field.Select field="tile-size-width" {...provided} />
                    </div>
                    <div style={{flex: 1}}>
                      <Field.Select field="tile-size-height" {...provided} />
                    </div>
                  </div>
                </FormComponent.Row>
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
                    <button type="submit" disabled={submitDisabled} className="blue">
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

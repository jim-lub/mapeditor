import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createScene } from 'state/ducks/scenes';

import createSceneFormSchema from './create-scene-form-schema';

import { Form, Field, FormComponent } from 'views/components/Form';
import { ModalComponents } from 'views/components/Modal';

import styles from './create-scene-form.module.css';

const Component = ({ requestStatus, actions, onClose }) => {
  const handleSubmit = ({ state }) => {
    actions.createScene({
      name: state['scene-name'],
      description: state['scene-description'],
      segmentSize: state['segment-size'],
      columns: state['columns'],
      rows: state['rows']
    });

    onClose();
  }

  return (
    <Form
      uid="create-scene-form"
      schema={createSceneFormSchema()}
      onSubmit={handleSubmit}
    >
      {
        ({ state, provided, submitDisabled }) => {
          return (
            <div>
              <div className={styles.componentWrapper}>

                <FormComponent.Row forField="scene-name" {...provided}>
                  <Field.Text field="scene-name" autoFocus {...provided} />
                </FormComponent.Row>

                <FormComponent.Row forField="scene-description" {...provided}>
                  <Field.TextArea field="scene-description" {...provided} />
                </FormComponent.Row>

                <FormComponent.Row forField="segment-size" {...provided}>
                  <Field.Select field="segment-size" {...provided} />
                </FormComponent.Row>

                <FormComponent.Row forField="columns" disableErrorMessages {...provided}>
                  <div style={{display: 'flex'}}>
                    <div style={{flex: 1, marginRight: 10}}>
                      <Field.Number field="columns" {...provided} />
                    </div>
                    <div style={{flex: 1}}>
                      <Field.Number field="rows" {...provided} />
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

const Defaults = ({ provided, state }) => {
  return (
    <>
      <Field.Text name="scene-name" autoFocus {...provided} />
      <Field.TextArea name="scene-description" {...provided} />
    </>
  )
}

const Presets = ({ provided, state }) => {
  const segmentSize = state['segment-size'].value;
  const columns = state['columns'].value;
  const rows = state['rows'].value;

  return (
    <div className={styles.presetsWrapper}>
      <div className={styles.presetsFieldsWrapper}>
        <Field.Select name="segment-size" {...provided} />
        <Field.Number name="columns" {...provided} />
        <Field.Number name="rows" {...provided} />
      </div>

      <div className={styles.presetsSettingsContainer}>
        <span className="bold">Allowed tile size(s):</span><br />
        {
          (segmentSize)
            ? "16px, 32px, 64px"
            : "-"
        }
        <br />

        <span className="bold">Map size:</span><br />
        {
          (segmentSize)
            ? `${Number(segmentSize.value) * Number(columns)}px x ${Number(segmentSize.value) * Number(rows)}px`
            : "-"
        }<br />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // requestStatus: getRequestStatus(state, { key: 'createScene' }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createScene }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

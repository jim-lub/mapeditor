import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createScene } from 'state/ducks/scenes';

import createSceneFormSchema from './create-scene-form-schema';

import { Form, Field, ProgressBar2 } from 'views/components/Form';
import { ModalComponents } from 'views/components/Modal';

import styles from './create-scene-form.module.css';

const Component = ({ requestStatus, actions, onClose }) => {
  const handleSubmit = (data) => {
    actions.createScene({
      name: data.defaults['scene-name'].value,
      description: data.defaults['scene-description'].value,
      segmentSize: data.presets['segment-size'].value.value,
      columns: data.presets['columns'].value,
      rows: data.presets['rows'].value
    });

    onClose();
  }

  return (
    <Form
      id="create-scene-form"
      schema={createSceneFormSchema()}
      components={[<Defaults />, <Presets />]}
      onSubmit={handleSubmit}
    >
      {
        ({ Component, back, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div>
              <div className={styles.componentWrapper}>
                { Component }
              </div>

              <ProgressBar2 currentStep={currentStep} totalSteps={totalSteps} />

              <ModalComponents.DefaultFooter
                buttonLeft={
                  () => (
                    <button type="button" onClick={(isFirstStep) ? onClose : back}>
                      { (isFirstStep) ? 'Cancel' : 'Back' }
                    </button>
                  )
                }

                buttonRight={
                  () => (
                    <button type="submit" disabled={disableNextButton} className="blue">
                      { (isLastStep) ? 'Create' : 'Next' }
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

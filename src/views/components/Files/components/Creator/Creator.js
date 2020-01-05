import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createFile } from 'state/ducks/files';

import creatorFormSchema from './creator-form-schema';

import { Form, Field } from 'views/components/Form';

import styles from './creator.module.css';

const Component = ({ actions }) => {
  const handleSubmit = (data) => {
    actions.createFile({
      fileName: data.defaults['file-name'].value,
      fileType: data.defaults['file-type'].value.value,
      parentId: '12345'
    })
    .then(uid => {
      console.log('created file with id: ' + uid)
    })
  }

  return (
    <Form id="creator-form" schema={creatorFormSchema()} components={[<CreatorForm />]} onSubmit={handleSubmit}>
      {
        ({ Component, back, currentStep, totalSteps, isFirstStep, isLastStep, disableBackButton, disableNextButton }) => {
          return (
            <div className={styles.container}>
              { Component }

              <button className="blue" disabled={disableNextButton}>Create / upload</button>
            </div>
          )
        }
      }
    </Form>
  )
}

const CreatorForm = ({ provided, state }) => {
  return (
    <>
      <Field.Text name="file-name" {...provided} />
      <Field.Select name="file-type" {...provided} />
    </>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ createFile }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

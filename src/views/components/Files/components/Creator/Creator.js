import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createFile } from 'state/ducks/files';

import creatorFormSchema from './creator-form-schema';

import { Form, Field } from 'views/components/Form';
import { Loader } from 'views/components/Loader';

import styles from './creator.module.css';

const Component = ({ actions }) => {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (data) => {
    setUploading(true)

    actions.createFile({
      fileName: data.defaults['file-name'].value,
      fileType: data.defaults['file-type'].value.value,
      file: ( data.defaults['file'].value) ? data.defaults['file'].value.file : null,
      parentId: '12345'
    })
    .then(uid => {
      console.log('created file with id: ' + uid)
      setUploading(false);
    })
  }

  if (uploading) {
    return (
      <div>
        <Loader.Simple />
        Uploading files..
      </div>
    )
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
  const file = (state.file.value) ? state.file.value.localURL : null;

  return (
    <>
      <Field.Text name="file-name" {...provided} />
      <Field.Select name="file-type" {...provided} />
      <Field.File name="file" {...provided} />
      <img src={file} alt="No file.." style={{maxWidth:"100%"}}/>
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

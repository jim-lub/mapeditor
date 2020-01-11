import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createFile } from 'state/ducks/files';

import creatorFormSchema from './creator-form-schema';

import { Form, Field, FormComponent } from 'views/components/Form';
import { Loader } from 'views/components/Loader';

import styles from './creator.module.css';

const Component = ({ actions }) => {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = ({ state }) => {
    console.log(state)
    // setUploading(true)
    //
    // actions.createFile({
    //   fileName: data.defaults['file-name'].value,
    //   fileType: data.defaults['file-type'].value.value,
    //   file: ( data.defaults['file'].value) ? data.defaults['file'].value.file : null,
    //   parentId: '12345'
    // })
    // .then(uid => {
    //   console.log('created file with id: ' + uid)
    //   setUploading(false);
    // })
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
    <Form uid="creator-form" schema={creatorFormSchema()} onSubmit={handleSubmit}>
      {
        ({ state, provided, submitDisabled }) => {
          return (
            <div className={styles.container} style={{width: 600}}>
              <FormComponent.Row forField="file-name" {...provided}>
                <Field.Text field="file-name" autoFocus {...provided} />
              </FormComponent.Row>

              <FormComponent.Row forField="file-name-width" {...provided}>
                <Field.Number field="file-name-width" {...provided} />
              </FormComponent.Row>

              <FormComponent.Row forField="file-name-three" {...provided}>
                <Field.Text field="file-name-three" {...provided} />
              </FormComponent.Row>

              <FormComponent.Row forField="file-type" {...provided}>
                <Field.Select field="file-type" {...provided} />
              </FormComponent.Row>

              <FormComponent.Row forField="file" {...provided}>
                <Field.File field="file" {...provided} />
              </FormComponent.Row>

              <button className="blue" disabled={submitDisabled}>Create / upload</button>
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
    actions: bindActionCreators({ createFile }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

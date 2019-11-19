import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { firebase } from 'state/lib/firebase';
import { uuid } from 'lib/utils';

import styles from './file-uploader.module.css';

const Component = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState({});
  const [progress, setProgress] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const imagePreview = URL.createObjectURL(e.target.files[0])
    console.log(e.target.files[0])

    setFile(file);
    setFilePreview({
      imagePreview,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      refName: uuid.create('TS')
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.previewContainer}>
        <img src={filePreview.imagePreview} alt="" className={styles.imagePreview}/>
        <ul>
          <li>{ filePreview.fileName }</li>
          <li>{ filePreview.fileSize }</li>
          <li>{ filePreview.fileType }</li>
          <li>{ filePreview.refName }</li>
        </ul>
      </div>

      <div className={styles.form}>
        <input type="file" ref={fileRef} onChange={handleChange} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

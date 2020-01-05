import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFiles } from 'state/ducks/files';

import fileConstants from 'lib/constants/fileConstants';

import styles from './browser.module.css';

const Component = ({ actions }) => {
  const [files, setFiles] = useState([]);

  const handleRefresh = () => {
    actions.getFiles({ uid: '12345' })
      .then(arr => {
        console.log(arr)
        setFiles(arr);
      });
  }

  return (
    <div className={styles.container}>
      <button onClick={handleRefresh}>Refresh</button>

      {
        files.map(({ fileName, fileType }, index) => {
          const { icon, extension } = fileConstants[ fileType ];

          return (
            <div key={index} className={styles.fileRowContainer}>
              <div className={styles.fileIconWrapper}>
                <img src={icon} alt="" />
              </div>

              <div className={styles.fileNameWrapper}>
                { fileName + "" + extension }
              </div>

              <div className={styles.fileOptionsWrapper}>
                <span className={styles.spanButton}>Delete</span>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ getFiles }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

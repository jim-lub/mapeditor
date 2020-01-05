import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Browser, Creator } from './components';

import styles from './files.module.css';

const Component = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.creatorWrapper}>
        <Creator />
      </div>

      <div className={styles.browserWrapper}>
        <Browser />
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

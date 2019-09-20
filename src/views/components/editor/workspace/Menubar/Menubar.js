import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './menubar.module.css';

import {
  storeMap,

  getStoreMapStatus
} from 'state/ducks/editor/map'

const Component = ({ storeMapStatus, actions }) => {
  const handleSave = () => {
    actions.storeMap()
  }

  return (
    <>
      <div className={styles.menuItemsContainer}>
        <button
          className="blue"
          style={{padding: 9}}
          onClick={handleSave}
          disabled={(storeMapStatus.loading)}
        >
          Save
        </button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    storeMapStatus: getStoreMapStatus(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ storeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

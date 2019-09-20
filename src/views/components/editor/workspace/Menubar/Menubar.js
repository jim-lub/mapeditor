import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './menubar.module.css';

import {
  storeMap,
  getStoreMapStatus,
  getDisableAllInput
} from 'state/ducks/editor/map'

const Component = ({ storeMapStatus, disableAllInput, actions }) => {
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
          disabled={(disableAllInput)}
        >
          Save
        </button>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    storeMapStatus: getStoreMapStatus(state),
    disableAllInput: getDisableAllInput(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ storeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

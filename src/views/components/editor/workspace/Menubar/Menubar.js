import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './menubar.module.css';

import { storeMap } from 'state/ducks/editor/map';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import { isAllEditorInputDisabled } from 'state/ducks/editor/utils';

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
    storeMapStatus: getRequestStatus(state, { key: 'storeMap' }),
    disableAllInput: isAllEditorInputDisabled(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ storeMap }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

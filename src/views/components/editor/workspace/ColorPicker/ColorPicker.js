import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColor } from 'state/ducks/editor/tools';

import { CustomPicker } from './CustomPicker';

import styles from './colorpicker.module.css';

const Component = ({ color, actions }) => {
  const handleColorValueChange = (colorValue) => {
    actions.setColor({
      hex: colorValue.hex
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>Color Picker</div>
        <div className={styles.colorPicker}>
          <CustomPicker
            onValueChange={handleColorValueChange}
          />
        </div>
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
    actions: bindActionCreators({ setColor }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

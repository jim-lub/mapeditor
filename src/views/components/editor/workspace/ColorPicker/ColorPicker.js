import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColor, getColor } from 'state/ducks/editor/tools';

import { CustomPicker } from './CustomPicker';

import styles from './colorpicker.module.css';
import workspaceStyles from '../workspace.module.css';

const Component = ({ color, actions }) => {
  const handleColorValueChange = (colorValue) => {
    actions.setColor({
      hex: colorValue.hex,
      rgb: colorValue.rgb,
      hsl: colorValue.hsl
    })
  }

  return (
    <div className={workspaceStyles.moduleWrapperOuterNonFlex}>
      <div className={workspaceStyles.moduleWrapperInner}>
        <div className={workspaceStyles.moduleHeader}>Color Picker</div>
        <div className={styles.colorPicker}>
          <CustomPicker
            color={color}
            onChangeComplete={handleColorValueChange}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    color: getColor(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setColor }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

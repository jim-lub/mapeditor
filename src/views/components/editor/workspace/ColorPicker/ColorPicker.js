import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColorValue, getColorValue } from 'state/ducks/editor/tools';

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';
import { CustomPicker } from './CustomPicker';

import styles from './colorpicker.module.css';

const Component = ({ color, actions, contentWidth, contentHeight }) => {
  const handleColorValueChange = (colorValue) => {
    actions.setColorValue({
      hex: colorValue.hex,
      rgb: colorValue.rgb,
      hsl: colorValue.hsl
    })
  }

  return (
    <CustomPicker
      contentWidth={contentWidth}
      contentHeight={contentHeight}
      color={color}
      onChangeComplete={handleColorValueChange}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    color: getColorValue(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setColorValue }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

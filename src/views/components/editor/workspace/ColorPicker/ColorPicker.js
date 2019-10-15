import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColorValue, getColorValue } from 'state/ducks/editor/tools';

import { WorkspaceModuleWrapper } from '../WorkspaceModuleWrapper';
import { CustomPicker } from './CustomPicker';

import styles from './colorpicker.module.css';

const Component = ({ color, actions }) => {
  const handleColorValueChange = (colorValue) => {
    actions.setColorValue({
      hex: colorValue.hex,
      rgb: colorValue.rgb,
      hsl: colorValue.hsl
    })
  }

  return (
    <WorkspaceModuleWrapper moduleName="Color Picker" minHeight={237} maxHeight={237}>
      <CustomPicker
        color={color}
        onChangeComplete={handleColorValueChange}
      />
    </WorkspaceModuleWrapper>
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

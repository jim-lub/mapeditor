import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setColorValue, getColorValue } from 'state/ducks/editor/tools';

import { CustomPicker } from './CustomPicker';

const Component = ({ color, actions, contentWidth, contentHeight }) => {
  const handleColorValueChange = (colorValue) => {
    actions.setColorValue({
      hex: colorValue.hex,
      rgb: colorValue.rgb,
      hsl: colorValue.hsl
    })
  }

  const convertHexToRGB = (hex) => {
    const [r, g, b] = hex
      .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
               ,(m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16));

    return { r, g, b };
  }

  const colorObject = {
    hex: color.hex,
    rgb: color.rgb || convertHexToRGB(color.hex),
    hsl: color.hsl || {}
  }

  return (
    <CustomPicker
      contentWidth={contentWidth}
      contentHeight={contentHeight}
      color={colorObject}
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

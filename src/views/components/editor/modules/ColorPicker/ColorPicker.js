import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getActiveLayerId,
  getLayerPropertiesById
} from 'state/ducks/editor/layers';

import {
  setColorValue,
  getColorValue
} from 'state/ducks/editor/tools';

import * as layerTypes from 'lib/constants/layerTypes';

import { NoColorLayerNotification } from 'views/components/Editor/components';
import { CustomPicker } from './CustomPicker';

const Component = ({ activeLayerId, layerProperties, color, actions, contentWidth, contentHeight }) => {
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

  if (!activeLayerId || layerProperties.layerType !== layerTypes.color) {
    return (
      <div style={{width: contentWidth, height: contentHeight, overflow: 'auto'}}>
        <NoColorLayerNotification width={contentWidth / 1.5} height={contentHeight / 1.5}/>
      </div>
    )
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
    activeLayerId: getActiveLayerId(state),
    layerProperties: getLayerPropertiesById(state, { layerId: getActiveLayerId(state) }),
    color: getColorValue(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setColorValue }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

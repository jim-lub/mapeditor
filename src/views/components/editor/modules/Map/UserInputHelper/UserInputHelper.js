import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  getActiveLayerId,
  getLayerPropertiesById
} from 'state/ducks/editor/layers';

import {
  getCurrentTool,
  getColorValue,
  getTileValue
} from 'state/ducks/editor/tools';

import * as layerTypes from 'lib/constants/layerTypes';
import layerConstants from 'lib/constants/layerConstants';
import toolConstants from 'lib/constants/toolConstants';

import { concatClassNames } from 'lib/utils';

import styles from './userinputhandler.module.css';

const Component = ({ activeLayerId, getLayerPropertiesById, currentTool, colorValue, tileValue }) => {
  const [layerType, setLayerType] = useState(null);
  const [layerProperties, setLayerProperties] = useState(null);
  const [LayerIcon, setLayerIcon] = useState(null);
  const [toolProperties, setToolProperties] = useState(null);
  const [ToolIcon, setToolIcon] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const activeLayerProperties = getLayerPropertiesById({ layerId: activeLayerId });

    if (activeLayerProperties.layerType) {
      return setLayerType(activeLayerProperties.layerType)
    }

    setLayerType(null);
  }, [activeLayerId, getLayerPropertiesById])

  useEffect(() => {
    const properties = layerConstants[layerType];

    if (properties) {
      const { name, icon } = properties;

      setLayerIcon(icon);
      return setLayerProperties({ name });
    }

    setLayerProperties(null);
  }, [layerType]);

  useEffect(() => {
    const properties = toolConstants[currentTool];

    if (properties) {
      const { name, icon, isAllowedOnLayers } = properties;

      setToolIcon(icon);
      return setToolProperties({ name, isAllowedOnLayers });
    }

    setToolProperties(null);
  }, [currentTool]);

  useEffect(() => {
    const globalErrors = [
      (layerProperties) ? null : 'No layer selected',
      (toolProperties) ? null : 'No tool selected',
    ]
    .filter(error => error);
    if (globalErrors.length > 0) return setErrors(globalErrors);

    const specificErrors = [
      (toolProperties.isAllowedOnLayers.includes(layerType)) ? null : `${toolProperties.name} is inapplicable on ${layerProperties.name.toLowerCase()} layers`,
    ]
    .filter(error => error);

    setErrors(specificErrors);
  }, [layerType, layerProperties, toolProperties])

  const textContainerClassNames = concatClassNames([
    'clearfix',
    styles.textContainer,
    (errors.length > 0) ? styles.textContainerErrors : null
  ]);

  return (
    <div className={"clearfix " + styles.wrapper}>
      <div className={styles.iconContainer}>
        {
          (LayerIcon) &&
          <div className={styles.iconWrapper}>
            <LayerIcon className={styles.icon} />
          </div>
        }

        {
          (ToolIcon) &&
          <div className={styles.iconWrapper}>
            <ToolIcon className={styles.icon} />
          </div>
        }

        {
          (layerProperties && toolProperties) &&
          (layerType === layerTypes.color && toolProperties.isAllowedOnLayers.includes(layerType)) &&
          <div className={styles.colorValueContainer}>
            <div className={styles.colorValue} style={{backgroundColor: colorValue.hex}} />
          </div>
        }
      </div>

      <div className={textContainerClassNames}>
        {
          (errors.length > 0) &&
          <div className={styles.textContainerContent}>
            { errors[0] }
            {
              (errors.length > 1) &&
              ` (${(errors.length - 1)} more..)`
            }
          </div>
        }

        {
          (errors.length === 0) &&
          <div className={styles.textContainerContent}>
            Selection: 1 tile(s)
          </div>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    activeLayerId: getActiveLayerId(state),
    getLayerPropertiesById: ({ layerId }) => getLayerPropertiesById(state, { layerId }),

    currentTool: getCurrentTool(state),
    colorValue: getColorValue(state),
    tileValue: getTileValue(state)
  }
}

export default connect(mapStateToProps)(Component);

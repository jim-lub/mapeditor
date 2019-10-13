import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getMapProperties,
} from 'state/ducks/editor/map';

import {
  handleUserInput,
  handleCanvasUpdate,
  validateTilemapDataSegment,
  getTilemapDataSegmentbyId
} from 'state/ducks/editor/tilemap';

import {
  getActiveLayerId,
  getLayerPropertiesObject,
  getLayerSortOrder,
} from 'state/ducks/editor/layers';

import { getCurrentTool } from 'state/ducks/editor/tools';
// import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import { Loader } from 'views/components/Loader';
import { Canvas, UserInput } from '../../components';

import styles from '../../segment.module.css';

const Component = ({
  segmentId, mapProperties: { segmentSize },
  activeLayerId, layerProperties, layerSortOrder,
  tilemapData, currentTool, actions
}) => {
  const [initialized, setInitialized] = useState(false);
  const [disablePointerInput, setDisablePointerInput] = useState(false);
  const [isActiveSegment, setIsActiveSegment] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    actions.validateTilemapDataSegment({ segmentId }).then(() => setInitialized(true))
  }, [segmentId, layerSortOrder, actions])

  useEffect(() => {
    if (initialized && canvasRef && canvasRef.current) {
      actions.handleCanvasUpdate({ segmentId, canvasRef, canvasWidth: segmentSize.width, canvasHeight: segmentSize.height });
    }
  });

  useEffect(() => {
    if (0 === 1) {
      setDisablePointerInput(true);
    } else {
      setDisablePointerInput(false);
    }
  }, [currentTool, setDisablePointerInput]);

  const handlePointerEnter = () => setIsActiveSegment(true);
  const handlePointerLeave = () => setIsActiveSegment(false);

  const handleInteractionNodeEvent = ({ columnIndex, rowIndex, inputActions, inputModifiers }) => {
    actions.handleUserInput({
      segmentId, columnIndex, rowIndex,
      inputActions,
      inputModifiers
    });
  }

  const isCurrentTool = () => {
    if (toolConstants.hasOwnProperty(currentTool)) {
      return toolConstants[currentTool].isAllowedOnLayers.includes( layerProperties[activeLayerId].layerType )
    }
    return false;
  }
  
  const enableUserInput = (
    isActiveSegment &&
    !disablePointerInput &&
    (layerSortOrder.length > 0) &&
    layerProperties[activeLayerId] &&
    layerProperties[activeLayerId].visible &&
    isCurrentTool()
  )


  if (!initialized) {
    return (
      <div className={styles.controllerWrapper} style={{ width: segmentSize.width, height: segmentSize.height }}>
        <div className={styles.controllerLoaderWrapper}><Loader.Simple width={48} height={48}/></div>
      </div>
    )
  }

  return (
    <div
      className={styles.controllerWrapper}
      style={{
        width: segmentSize.width,
        height: segmentSize.height,
        cursor: (!enableUserInput) ? "not-allowed" : null
      }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >

      <Canvas
      ref={canvasRef}
      canvasWidth={segmentSize.width}
      canvasHeight={segmentSize.height}
      />

      {
        enableUserInput &&
        <UserInput
          segmentSize={segmentSize}
          layerProperties={layerProperties[activeLayerId]}
          activeTool={currentTool}
          onPointerEvent={handleInteractionNodeEvent}
        />
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { segmentId } = ownProps;

  return {
    mapProperties: getMapProperties(state),
    activeLayerId: getActiveLayerId(state),
    layerProperties: getLayerPropertiesObject(state),
    layerSortOrder: getLayerSortOrder(state),
    tilemapData: getTilemapDataSegmentbyId(state, { segmentId }),

    currentTool: getCurrentTool(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      handleUserInput,
      handleCanvasUpdate,
      validateTilemapDataSegment
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

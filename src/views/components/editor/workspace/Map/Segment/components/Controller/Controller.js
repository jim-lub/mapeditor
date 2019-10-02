import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getMapProperties,
  getSegmentPropertiesById,
  getActiveLayerId,
  getLayerProperties,
  getLayerSortOrder,
  getTilemapDataBySegmentId,

  handleUserInput,
  handleCanvasUpdate,

  initializeTilemapDataSegment,
  validateTilemapDataSegment,
} from 'state/ducks/editor/map';

import { getActiveTool } from 'state/ducks/editor/tools';
import { useKeyPress } from 'lib/hooks';
// import * as toolTypes from 'lib/constants/toolTypes';
import toolConstants from 'lib/constants/toolConstants';

import { Loader } from 'views/components/Loader';
import { Canvas, UserInput, Properties } from '../../components';

import styles from '../../segment.module.css';

const Component = ({
  segmentId, segmentProperties: { initialized, modified }, mapProperties: { segmentSize },
  activeLayerId, layerProperties, layerSortOrder,
  tilemapData, activeTool, actions
}) => {
  const [disablePointerInput, setDisablePointerInput] = useState(false);
  const [isActiveSegment, setIsActiveSegment] = useState(false);
  const canvasRef = useRef(null);
  const showProperties = useKeyPress('D');

  useEffect(() => {
    if (!initialized) {
      actions.initializeTilemapDataSegment({ segmentId })
    }
  }, [initialized, segmentId, actions]);

  useEffect(() => {
    actions.validateTilemapDataSegment({ segmentId })
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
  }, [activeTool, setDisablePointerInput]);

  const handlePointerEnter = () => setIsActiveSegment(true);
  const handlePointerLeave = () => setIsActiveSegment(false);

  const handleInteractionNodeEvent = ({ columnIndex, rowIndex, inputActions, inputModifiers }) => {
    actions.handleUserInput({
      segmentId, columnIndex, rowIndex,
      inputActions,
      inputModifiers
    });
  }

  const enableUserInput = (
    isActiveSegment &&
    !disablePointerInput &&
    (layerSortOrder.length > 0) &&
    layerProperties[activeLayerId] &&
    layerProperties[activeLayerId].visible &&
    toolConstants[activeTool].isAllowedOnLayers.includes( layerProperties[activeLayerId].type )
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
          activeTool={activeTool}
          onPointerEvent={handleInteractionNodeEvent}
        />
      }

      {
        showProperties && (layerSortOrder.length > 0) &&
        <Properties
          initialized={initialized}
          modified={modified}
        />
      }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { segmentId } = ownProps;

  return {
    mapProperties: getMapProperties(state),
    segmentProperties: getSegmentPropertiesById(state, { segmentId }),
    activeLayerId: getActiveLayerId(state),
    layerProperties: getLayerProperties(state),
    layerSortOrder: getLayerSortOrder(state),
    tilemapData: getTilemapDataBySegmentId(state, { segmentId }),

    activeTool: getActiveTool(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      handleUserInput,
      handleCanvasUpdate,
      initializeTilemapDataSegment,
      validateTilemapDataSegment
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

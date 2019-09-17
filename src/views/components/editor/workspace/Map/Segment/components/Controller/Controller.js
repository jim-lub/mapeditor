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

  initializeTilemapDataBySegmentId,
  canvasController,
  setSingleTileValue,
  clearSingleTileValue
} from 'state/ducks/editor/map';

import { useKeyPress } from 'lib/hooks';

import { Loader } from 'views/components/Loader';

import {
  Canvas,
  Interaction
} from '../../components';

import styles from '../../segment.module.css';

const Component = ({
  segmentId, segmentProperties: { initialized }, mapProperties: { segmentSize },
  activeLayerId, layerProperties, layerSortOrder,
  tilemapData, actions
}) => {
  const [value, setValue] = useState("#c5c5c5");
  const [isActiveSegment, setIsActiveSegment] = useState(false);
  const canvasRef = useRef(null);
  const enableTouchActions = useKeyPress("h");

  useEffect(() => {
    if (!initialized) {
      actions.initializeTilemapDataBySegmentId({ segmentId })
    }
  }, [initialized, segmentId, actions]);

  useEffect(() => {
    if (initialized && canvasRef && canvasRef.current) {
      actions.canvasController({ segmentId, canvasRef, canvasWidth: segmentSize.width, canvasHeight: segmentSize.height });
    }
  });

  const handleMouseEnter = () => setIsActiveSegment(true);
  const handleMouseLeave = () => setIsActiveSegment(false);

  const handleInteractionNodeEvent = ({ columnIndex, rowIndex, leftClickAction, rightClickAction, paintAction, altKey, ctrlKey, shiftKey }) => {
    if (enableTouchActions) return; // hand tool

    if ((leftClickAction || paintAction) && !(altKey || shiftKey)) {
      if (tilemapData[activeLayerId][columnIndex][rowIndex] === value) return;

      return actions.setSingleTileValue({ segmentId, layerId: activeLayerId, columnIndex, rowIndex, value })
    }

    if ((leftClickAction || paintAction) && altKey && !(shiftKey)) {
      if (tilemapData[activeLayerId][columnIndex][rowIndex] === 0) return;

      return actions.clearSingleTileValue({ segmentId, layerId: activeLayerId, columnIndex, rowIndex })
    }
  }

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
      style={{ width: segmentSize.width, height: segmentSize.height, touchAction: (enableTouchActions) ? "auto" : "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <Canvas
      ref={canvasRef}
      canvasWidth={segmentSize.width}
      canvasHeight={segmentSize.height}
      />

      {
        isActiveSegment &&
        <Interaction
          segmentWidth={segmentSize.width}
          segmentHeight={segmentSize.height}
          layerProperties={layerProperties[activeLayerId]}
          tilemapData={tilemapData[activeLayerId]}
          value={value}
          onMouseEvent={handleInteractionNodeEvent}
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
    tilemapData: getTilemapDataBySegmentId(state, { segmentId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      initializeTilemapDataBySegmentId,
      canvasController,
      setSingleTileValue,
      clearSingleTileValue
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

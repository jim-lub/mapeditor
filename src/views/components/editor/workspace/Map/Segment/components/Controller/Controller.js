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
  setSingleTileValue
} from 'state/ducks/editor/map';

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
  const [isActiveSegment, setIsActiveSegment] = useState(false);
  const canvasRef = useRef(null);

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

  const handleInteractionNodeClick = ({ columnIndex, rowIndex }) => {
    console.log(columnIndex, rowIndex);
    actions.setSingleTileValue({
      segmentId,
      layerId: activeLayerId,
      columnIndex,
      rowIndex,
      value: "#c5c5c5"
    })
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
      style={{ width: segmentSize.width, height: segmentSize.height }}
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
          onInteractionNodeClick={handleInteractionNodeClick}
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
      setSingleTileValue
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

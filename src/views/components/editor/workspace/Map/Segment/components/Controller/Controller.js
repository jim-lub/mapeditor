import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getSegmentPropertiesById,
  getLayerProperties,
  getLayerSortOrder,
  getTilemapDataBySegmentId,

  initializeTilemapDataBySegmentId,
  canvasController
} from 'state/ducks/editor/map';

import { Loader } from 'views/components/Loader';

import {
  Canvas
} from '../../components';

import styles from '../../segment.module.css';

const Component = ({
  segmentId, segmentWidth, segmentHeight, segmentProperties: { initialized },
  layerProperties, layerSortOrder, tilemapData,
  actions
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!initialized) {
      actions.initializeTilemapDataBySegmentId({ segmentId })
    }
  }, [initialized, segmentId, actions]);

  useEffect(() => {
    if (initialized && canvasRef && canvasRef.current) {
      actions.canvasController({ segmentId, canvasRef, canvasWidth: segmentWidth, canvasHeight: segmentHeight });
    }
  });

  if (!initialized) {
    return (
      <div className={styles.controllerWrapper} style={{ width: segmentWidth, height: segmentHeight }}>
        <div className={styles.controllerLoaderWrapper}><Loader.Simple width={48} height={48}/></div>
      </div>
    )
  }

  return (
    <div className={styles.controllerWrapper} style={{ width: segmentWidth, height: segmentHeight }}>
      <Canvas
        ref={canvasRef}
        canvasWidth={segmentWidth}
        canvasHeight={segmentHeight}
      />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { segmentId } = ownProps;

  return {
    segmentProperties: getSegmentPropertiesById(state, { segmentId }),
    layerProperties: getLayerProperties(state),
    layerSortOrder: getLayerSortOrder(state),
    tilemapData: getTilemapDataBySegmentId(state, { segmentId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      initializeTilemapDataBySegmentId,
      canvasController
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

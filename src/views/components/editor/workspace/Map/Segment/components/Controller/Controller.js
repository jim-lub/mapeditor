import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getLayerProperties,
  getLayerSortOrder,
  getTilemapDataBySegmentId,

  validateTilemapDataBySegmentId
} from 'state/ducks/editor/map';

import { canvasController } from 'lib/editor/canvas';

import {
  Canvas
} from '../../components';

import styles from '../../segment.module.css';

const Component = ({
  segmentId, segmentWidth, segmentHeight,
  layerProperties, layerSortOrder, tilemapData,
  actions
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    actions.validateTilemapDataBySegmentId({ segmentId });
  }, [segmentId, layerSortOrder, actions]);

  useEffect(() => {
    canvasController.update({ canvasRef })
  });

  return (
    <div className={styles.controllerWrapper}>
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
    layerProperties: getLayerProperties(state),
    layerSortOrder: getLayerSortOrder(state),
    tilemapData: getTilemapDataBySegmentId(state, { segmentId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      validateTilemapDataBySegmentId
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

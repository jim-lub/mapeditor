import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleCanvasUpdate } from 'state/ducks/editor';

import {
  getLayerSortOrder,
  getLayerPropertiesObject
} from 'state/ducks/editor/layers';

import { getZoomScaleModifier } from 'state/ducks/editor/tools';
import { getTilemapData } from 'state/ducks/editor/segments';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import styles from '../segment.module.css';

const Component = ({ canvasWidth, canvasHeight, segmentId, layerSortOrder, layerProperties, zoomScaleModifier, actions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      actions.handleCanvasUpdate({
        segmentId,
        canvasRef,
        canvasWidth,
        canvasHeight,
        zoomScaleModifier
      })
    }
  //eslint-disable-next-line
});

  return (
    <div className={styles.canvasWrapper}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  )
}

const mapStateToProps = (state, { segmentId }) => {
  return {
    layerSortOrder: getLayerSortOrder(state),
    layerProperties: getLayerPropertiesObject(state),
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map }),
    tilemapData: getTilemapData(state, { segmentId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ handleCanvasUpdate }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

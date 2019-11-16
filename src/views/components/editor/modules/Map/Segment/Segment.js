import React from 'react';
import { connect } from 'react-redux';

import { getSegmentId } from 'state/ducks/editor/map';
import { getZoomScaleModifier } from 'state/ducks/editor/tools';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import * as moduleTypes from 'lib/constants/editorModuleTypes';

import { Canvas } from './Canvas';
import { Controller } from './Controller';
import { Loader } from 'views/components/Loader';

import styles from './segment.module.css';

const Component = ({ segmentId, initialized = false, loading = true, error = null, zoomScaleModifier, style }) => {
  return (
    <div className={styles.segmentContainer} style={{...style}}>
      <Canvas segmentId={segmentId} canvasWidth={style.width} canvasHeight={style.height} />
      <Controller segmentId={segmentId} />
      {
        (!initialized || loading) &&
        <Loader.SegmentOverlay
          width={style.width}
          height={style.height}
          scale={4}
        />
      }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { columnIndex, rowIndex } = ownProps;
  const segmentId = getSegmentId(state, { columnIndex, rowIndex });

  return {
    segmentId,
    zoomScaleModifier: getZoomScaleModifier(state, { type: moduleTypes.map }),
    ...getRequestStatus(state, { key: segmentId }) // pull initialized + loading + error
  }
}

export default connect(mapStateToProps)(Component);

import React from 'react';
import { connect } from 'react-redux';

import { getSegmentId } from 'state/ducks/editor/map';
import { getRequestStatus } from 'state/ducks/editor/requestStatus';

import { Controller } from './Controller';
import { Loader } from 'views/components/Loader';

import styles from './segment.module.css';

const Component = ({ segmentId, initialized = false, loading = true, error = null, style }) => {
  return (
    <div className={styles.segmentContainer} style={{...style}}>
      <Controller segmentId={segmentId} />
      {
        (!initialized || loading) &&
        <Loader.SegmentOverlay
          width={style.width}
          height={style.height}
          scale={8}
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
    ...getRequestStatus(state, { key: segmentId }) // pull initialized + loading + error
  }
}

export default connect(mapStateToProps)(Component);

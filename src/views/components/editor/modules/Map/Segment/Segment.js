import React from 'react';
import { connect } from 'react-redux';

import { Controller } from './components';

import {
  getSegmentId
} from 'state/ducks/editor/map';

import styles from './segment.module.css';

const Component = ({ columnIndex, rowIndex, style, segmentId }) => {
  return (
    <div style={{ ...style }} className={styles.segmentWrapper}>
      { /* segmentId */ }
      <Controller segmentId={segmentId} />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { columnIndex, rowIndex } = ownProps;

  return {
    segmentId: getSegmentId(state, { columnIndex, rowIndex })
  }
}

export default connect(mapStateToProps)(Component);

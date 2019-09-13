import React from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';

import { Controller } from './components';

import {
  getSegmentId
} from 'state/ducks/editor/map';

const Component = ({
  columnIndex, rowIndex, style,  // grid properties
  segmentId
}) => {
  return (
    <div style={style}>
    <AutoSizer>
      {
        ({ width: segmentWidth, height: segmentHeight }) =>
          <Controller segmentId={segmentId} segmentWidth={segmentWidth} segmentHeight={segmentHeight} />
      }
    </AutoSizer>
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

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';

import {
  getMapSize,
  getSegmentSize
} from 'state/ducks/editor/workspace/map';

import {
  SegmentController,
  CustomScrollbarGridWrapper
} from './components';

const Component = ({ mapSize, segmentSize }) => {
  return (
    <AutoSizer>
      {
        ({ width: viewportWidth, height: viewportHeight }) => {
          return (
            <FixedSizeGrid
              columnCount={mapSize.columns}
              rowCount={mapSize.rows}
              columnWidth={segmentSize.width}
              rowHeight={segmentSize.height}
              width={viewportWidth}
              height={viewportHeight}
              outerElementType={CustomScrollbarGridWrapper}
            >
              {SegmentController}
            </FixedSizeGrid>
          )
        }
      }
    </AutoSizer>
  )
}

const mapStateToProps = (state) => {
  return {
    mapSize: getMapSize(state),
    segmentSize: getSegmentSize(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

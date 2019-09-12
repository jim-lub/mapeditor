import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setTilemapDataObject,

  getSegmentId,
  getTilemapDataBySegmentId
} from 'state/ducks/editor/map';

const Component = ({ columnIndex, rowIndex, segmentId = null, getTilemapDataBySegmentId, actions, style }) => {
  const [tilemapData, setTilemapData] = useState(null);

  useEffect(() => {
    const tilemapData = getTilemapDataBySegmentId( segmentId );

    if (tilemapData) {
      setTilemapData('ALL THE TILE MAP DATA IS HERE!')
    } else {
      setTilemapData('NO DATA FOUND')
      actions.setTilemapDataObject({
        segmentId,
        tilemapData: {
          'layer-1': [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ]
        }
      })
    }
    //eslint-disable-next-line
  }, [])

  // if tilemapData found in redux store ->
      // if layerSortOrder array === found in tilemapData object -> render segment
      // else add missing layer tilemapData .then render
  // else generate tilemapData for each layer

  return (
    <div style={{ ...style, borderRight: "dotted 1px black", borderBottom: "dotted 1px black"}}>
      { columnIndex + ", " + rowIndex }<br />
      { segmentId }<br />
      { tilemapData }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { columnIndex, rowIndex } = ownProps;

  return {
    segmentId: getSegmentId(state, { columnIndex, rowIndex}),
    getTilemapDataBySegmentId: (segmentId) => getTilemapDataBySegmentId(state, { segmentId })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      setTilemapDataObject
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



export default ({ columnIndex, rowIndex, style }) => {
  return (
    <div style={{ ...style, borderRight: "dotted 1px black", borderBottom: "dotted 1px black"}}>{ columnIndex + ", " + rowIndex }</div>
  )
}

// const Component = ({ columnIndex, rowIndex, segmentId = null, getSegmentPropertiesById, style }) => {
//   const [segmentProperties, setSegmentProperties] = useState({});
//
//   useEffect(() => {
//     if (!segmentId) {
//       // buildTilemapDataSegment
//     }
//   }, [segmentId]);
//
//   // fetch segment properties
//   useEffect(() => {
//     const properties = getSegmentPropertiesById(segmentId);
//
//     if (properties) {
//       setSegmentProperties(properties);
//     } else {
//       // look for segment properties in firestore,
//       // if not found create the properties
//     }
//   }, [segmentId, getSegmentPropertiesById]);
//
//   // fetch tilemapData
//   useEffect(() => {
//
//   }, [segmentProperties]);
//
//   return (
//     <div style={style} className={styles.wrapper}>
//       { segmentId }, <br/>
//       {
//         Object.entries(segmentProperties).map(([key, value]) => key + ": " + value + ", ")
//       }
//     </div>
//   )
// }
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     segmentId: getSegmentIdFromGridByColumnAndRowIndex(state, ownProps.columnIndex, ownProps.rowIndex),
//     getSegmentPropertiesById: (segmentId) => getSegmentPropertiesById(state, segmentId)
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: bindActionCreators({ }, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Component);

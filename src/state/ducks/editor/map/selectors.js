export const getCurrentScene = state => state.editor.map.currentScene;

export const getMapProperties = state => state.editor.map.mapProperties;
export const getMapGrid = state => state.editor.map.mapGrid;

export const getSegmentId = (state, { columnIndex, rowIndex }) => state.editor.map.mapGrid[columnIndex][rowIndex] || null;
export const getColumnAndRowIndexBySegmentId = (state, { segmentId }) => findIndexes({ mapGrid: state.editor.map.mapGrid, segmentId });

const findIndexes = ({ mapGrid, segmentId }) => {
  let segmentColumnIndex = -1;
  let segmentRowIndex = -1;

  mapGrid.forEach((column, columnIndex) => {
    const rowIndex = column.indexOf(segmentId);

    if (rowIndex >= 0) {
      segmentColumnIndex = columnIndex;
      segmentRowIndex = rowIndex;
    }

    return false;
  });

  return {
    columnIndex: segmentColumnIndex,
    rowIndex: segmentRowIndex
  }
}

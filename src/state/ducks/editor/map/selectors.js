export const getCurrentScene = state => state.editor.map.currentScene;

export const getMapProperties = state => state.editor.map.mapProperties;
export const getMapGrid = state => state.editor.map.mapGrid;

export const getSegmentId = (state, { columnIndex, rowIndex }) => (state.editor.map.mapGrid.hasOwnProperty(columnIndex)) ? state.editor.map.mapGrid[columnIndex][rowIndex] : null;
export const getColumnAndRowIndexBySegmentId = (state, { segmentId }) => _findIndexOfSegmentId({ mapGrid: state.editor.map.mapGrid, segmentId });

const _findIndexOfSegmentId = ({ mapGrid, segmentId }) => {
  const { columnIndex, rowIndex } = mapGrid.reduce((obj, column, columnIndex) => {
    const rowIndex = column.indexOf(segmentId);

    if (rowIndex >= 0) {
      obj = { columnIndex, rowIndex}
    }

    return obj;
  }, {});

  return { columnIndex, rowIndex }
}

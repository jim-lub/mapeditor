export const getCurrentScene = state => state.editor.map.currentScene;

export const getMapProperties = state => state.editor.map.mapProperties;
export const getMapGrid = state => state.editor.map.mapGrid;

export const getSegmentId = (state, { columnIndex, rowIndex }) => state.editor.map.mapGrid[columnIndex][rowIndex] || null;

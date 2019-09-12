export const getInitializeMapStatus = state => state.editor.map.status.initializeMap;
export const getStoreMapStatus = state => state.editor.map.status.storeMap;

export const getMapProperties = state => state.editor.map.mapProperties;
export const getMapGrid = state => state.editor.map.mapGrid;

export const getSegmentId = (state, { columnIndex, rowIndex }) => state.editor.map.mapGrid[columnIndex][rowIndex];
export const getTilemapDataBySegmentId = (state, { segmentId }) => state.editor.map.tilemapData[segmentId];

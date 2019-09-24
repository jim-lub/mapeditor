export const getInitializeMapStatus = state => state.editor.map.status.initializeMap || {};
export const getStoreMapStatus = state => state.editor.map.status.storeMap || {};

export const getDisableAllInput = state => (
  getInitializeMapStatus(state).loading ||
  getStoreMapStatus(state).loading ||
  !getCurrentScene(state).uid
);

export const getCurrentScene = state => state.editor.map.currentScene;
export const getMapProperties = state => state.editor.map.mapProperties;
export const getMapGrid = state => state.editor.map.mapGrid;

export const getSegmentPropertiesById = (state, { segmentId }) => state.editor.map.segmentProperties[segmentId] || {};

export const getActiveLayerId = state => state.editor.map.activeLayerId;
export const getLayerProperties = state => state.editor.map.layerProperties;
export const getLayerPropertiesById = (state, { layerId }) => state.editor.map.layerProperties[layerId];
export const getLayerSortOrder = state => state.editor.map.layerSortOrder;

export const getSegmentId = (state, { columnIndex, rowIndex }) => state.editor.map.mapGrid[columnIndex][rowIndex];
export const getTilemapDataBySegmentId = (state, { segmentId }) => state.editor.map.tilemapData[segmentId] || {};

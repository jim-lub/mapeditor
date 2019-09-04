/*** map ***/
export const getMapProperties = state => state.editor.workspace.map.mapProperties;
export const getMapSize = state => state.editor.workspace.map.mapProperties.mapSize;
export const getSegmentSize = state => state.editor.workspace.map.mapProperties.segmentSize;
export const getAllowedTileSizes = state => state.editor.workspace.map.mapProperties.allowedTileSizes;

/*** layer ***/
export const getLayerSortOrder = state => state.editor.workspace.map.layerSortOrder;
export const getLayerPropertiesObj = state => state.editor.workspace.map.layerProperties;
export const getLayerPropertiesById = (state, layerId) => state.editor.workspace.map.layerProperties[layerId];

/*** segment ***/
export const getMapGrid = state => state.editor.workspace.map.mapGrid;

export const getSegmentIdFromGridByColumnAndRowIndex = (state, columnIndex, rowIndex) => {
  if (state.editor.workspace.map.mapGrid.hasOwnProperty(columnIndex)) {
    if (state.editor.workspace.map.mapGrid[columnIndex].hasOwnProperty(rowIndex)) {
      return state.editor.workspace.map.mapGrid[columnIndex][rowIndex];
    }
  }

  return null;
};

export const getSegmentPropertiesObj = state => state.editor.workspace.map.segmentProperties;
export const getSegmentPropertiesById = (state, segmentId) => state.editor.workspace.map.segmentProperties[segmentId];

export const getTilemapDataBySegmentId = (state, segmentId) => state.editor.workspace.map.tilemapData[segmentId];

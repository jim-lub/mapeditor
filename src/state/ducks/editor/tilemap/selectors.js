import _ from 'lodash';

export const getTilemapDataSegmentById = (state, { segmentId }) => state.editor.tilemap.tilemapDataObject[segmentId] || [];
export const getTilemapDataObject = (state) => state.editor.tilemap.tilemapDataObject;

export const getSegmentPropertiesById = (state, { segmentId }) => state.editor.tilemap.segmentProperties[segmentId] || {};
export const getSegmentPropertiesObject = (state) => state.editor.tilemap.segmentProperties;

export const getCurrentTileValueByColumnIndexAndRowIndex = (state, { segmentId, layerId, columnIndex, rowIndex }) => {
  if (!state.editor.tilemap.tilemapDataObject.hasOwnProperty(segmentId)) return 0;
  if (!state.editor.tilemap.tilemapDataObject[segmentId].hasOwnProperty(layerId)) return 0;
  if (!state.editor.tilemap.tilemapDataObject[segmentId][layerId][columnIndex]) return 0;
  if (!state.editor.tilemap.tilemapDataObject[segmentId][layerId][columnIndex][rowIndex]) return 0;

  return state.editor.tilemap.tilemapDataObject[segmentId][layerId][columnIndex][rowIndex];
};

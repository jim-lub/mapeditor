export const getTilemapData = (state, { segmentId }) => state.editor.segments.tilemapData[segmentId] || {};
export const getTilemapDataObject = (state) => state.editor.segments.tilemapData;
export const getPropertiesObject = (state) => state.editor.segments.properties;
export const getCurrentTileValue = (state, { segmentId, layerId, tilemapColumnIndex, tilemapRowIndex }) =>
  state.editor.segments.tilemapData[segmentId][layerId][tilemapColumnIndex][tilemapRowIndex] || null;

export const getTilemapData = (state, { segmentId }) => state.editor.segments.tilemapData[segmentId] || {};
export const getTilemapDataObject = (state) => state.editor.segments.tilemapData;
export const getPropertiesObject = (state) => state.editor.segments.properties;

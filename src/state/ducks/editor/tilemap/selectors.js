export const getTilemapDataSegmentById = (state, { segmentId }) => state.editor.tilemap.tilemapDataObject[segmentId] || [];
export const getTilemapDataObject = (state) => state.editor.tilemap.tilemapDataObject;

export const getSegmentPropertiesById = (state, { segmentId }) => state.editor.tilemap.segmentProperties[segmentId] || {};
export const getSegmentPropertiesObject = (state) => state.editor.tilemap.segmentProperties;

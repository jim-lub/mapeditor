export const getTilemapDataSegmentById = (state, { segmentId }) => state.editor.tilemap.tilemapDataObject[segmentId] || [];
export const getTilemapDataObject = (state) => state.editor.tilemap.tilemapDataObject;

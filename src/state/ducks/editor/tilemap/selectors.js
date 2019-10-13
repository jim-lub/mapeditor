export const getTilemapDataSegmentById = (state, { segmentId }) => state.editor.tilemap.tilemapDataObject[segmentId] || [];

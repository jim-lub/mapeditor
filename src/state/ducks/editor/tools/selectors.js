export const getCurrentTool = state => state.editor.tools.currentTool;
export const getZoomScaleModifier = (state, { type }) => state.editor.tools.zoomScaleModifier[type] || 1;
export const getColorValue = state => state.editor.tools.colorValue;
export const getTileSelection = state => state.editor.tools.tileSelection;
export const getTileSelectionGrid = state => state.editor.tools.tileSelection.grid;
export const getTileSelectionList = state => state.editor.tools.tileSelection.list;

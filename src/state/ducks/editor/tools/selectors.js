export const getCurrentTool = state => state.editor.tools.currentTool;
export const getZoomScaleModifier = (state, { type }) => state.editor.tools.zoomScaleModifier[type] || 1;
export const getColorValue = state => state.editor.tools.colorValue;

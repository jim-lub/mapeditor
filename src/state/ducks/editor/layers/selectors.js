export const getActiveLayerId = state => state.editor.layers.activeLayerId;
export const getLayerSortOrder = state => state.editor.layers.layerSortOrder;
export const getLayerPropertiesById = (state, { layerId }) => state.editor.layers.layerProperties[layerId];
export const getLayerPropertiesObject = state => state.editor.layers.layerProperties;

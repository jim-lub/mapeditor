export const getActiveLayerId = state => state._editor.layers.activeLayerId;
export const getLayerSortOrder = state => state._editor.layers.getLayerSortOrder;
export const getLayerPropertiesById = (state, { layerId }) => state._editor.layers.layerProperties[layerId];
export const getLayerPropertiesObject = state => state._editor.layers.layerProperties;

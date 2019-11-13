import * as types from './types';

export const setActiveLayerId = ({ layerId }) => ({
  type: types.setActiveLayerId,
  payload: { layerId }
});

export const clearActiveLayerId = () => ({
  type: types.clearActiveLayerId
});


export const setLayerSortOrder = ({ layerSortOrder }) => ({
  type: types.setLayerSortOrder,
  payload: { layerSortOrder }
});

export const clearLayerSortOrder = () => ({
  type: types.clearLayerSortOrder
});


export const setLayerPropertiesById = ({
  layerId, layerType, layerName,
  tileSize, visible, locked
}) => ({
  type: types.setLayerPropertiesById,
  payload: {
    layerId,
    layerType,
    layerName,
    tileSize,
    visible,
    locked
  }
});

export const clearLayerPropertiesById = ({ layerId }) => ({
  type: types.clearLayerPropertiesById,
  payload: { layerId }
});

export const clearAllLayerProperties = () => ({
  type: types.clearAllLayerProperties
});

export const incrementCreatedLayersCount = ({ layerType }) => ({
  type: types.incrementCreatedLayersCount,
  payload: { layerType }
});

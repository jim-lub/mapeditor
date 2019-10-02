import * as utils from './utils';

export const setActiveLayerId = (state, action) => {
  const { activeLayerId } = action.payload;

  return {
    ...state,
    activeLayerId
  }
};

export const clearActiveLayerId = (state, action) => {
  return {
    ...state,
    activeLayerId: null
  }
};


export const setLayerSortOrder = (state, action) => {
  const { layerSortOrder } = action.payload;

  return {
    ...state,
    layerSortOrder
  }
};

export const clearLayerSortOrder = (state, action) => {
  return {
    ...state,
    layerSortOrder: []
  }
};


export const setLayerPropertiesById = (state, action) => {
  const { layerId, layerType, layerName, tileSize, visible, locked } = action.payload;

  return {
    ...state,
    layerProperties: {
      ...state.layerProperties,
      [layerId]: {
        ...state.layerProperties[layerId],
        layerType: (typeof layerType !== undefined) ? layerType : state.layerProperties[layerId].layerType,
        layerName: (typeof layerName !== undefined) ? layerName : state.layerProperties[layerId].layerName,
        tileSize: (typeof tileSize !== undefined) ? tileSize : state.layerProperties[layerId].tileSize,
        visible: (typeof visible !== undefined) ? visible : state.layerProperties[layerId].visible,
        locked: (typeof locked !== undefined) ? locked : state.layerProperties[layerId].locked,
      }
    }
  }
};

export const clearLayerPropertiesById = (state, action) => {
  const { layerId } = action.payload;

  return {
    ...state,
    layerProperties: {
      ...utils.deleteKeyValuePairFromObject(
        state.layerProperties,
        layerId
      )
    }
  }
};

export const clearAllLayerProperties = (state, action) => {
  return {
    ...state,
    layerProperties: {}
  }
};

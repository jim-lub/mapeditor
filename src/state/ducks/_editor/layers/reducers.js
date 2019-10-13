import { deleteKeyValuePairFromObject } from 'state/lib/utils';

export const setActiveLayerId = (state, action) => {
  const { layerId } = action.payload;

  return {
    ...state,
    activeLayerId: layerId
  }
}

export const clearActiveLayerId = (state, action) => {
  return {
    ...state,
    activeLayerId: null
  }
}


export const setLayerSortOrder = (state, action) => {
  const { layerSortOrder } = action.payload;

  return {
    ...state,
    layerSortOrder
  }
}

export const clearLayerSortOrder = (state, action) => {
  return {
    ...state,
    layerSortOrder: []
  }
}


export const setLayerPropertiesById = (state, action) => {
  const {
    layerId,
    layerType = state.layerProperties[layerId].layerType,
    layerName = state.layerProperties[layerId].layerName,
    tileSize = state.layerProperties[layerId].tileSize,
    visible = state.layerProperties[layerId].visible || true,
    locked = state.layerProperties[layerId].locked || false,
  } = action.payload;

  return {
    ...state,
    layerProperties: {
      ...state.layerProperties,
      [layerId]: {
        ...state.layerProperties[layerId],
        layerType,
        layerName,
        tileSize,
        visible,
        locked
      }
    }
  }
}

export const clearLayerPropertiesById = (state, action) => {
  const { layerId } = action.payload;

  return {
    ...state,
    layerProperties: {
      ...deleteKeyValuePairFromObject(
        state.layerProperties,
        layerId
      )
    }
  }
}

export const clearAllLayerProperties = (state, action) => {
  return {
    ...state,
    layerProperties: {}
  }
}

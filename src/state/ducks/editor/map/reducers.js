import { statusReducer } from 'state/lib/utils';
import * as layerTypes from 'lib/constants/layerTypes';
import layerConstants from 'lib/constants/layerConstants';

export const initializeMapRequest = (state, action) => {
  return {
    ...state,
    ...statusReducer('initializeMap', 'REQUEST', state)
  }
}

export const initializeMapSuccess = (state, action) => {
  return {
    ...state,
    ...statusReducer('initializeMap', 'SUCCESS', state),
    currentScene: {
      ...state.currentScene,
      initialized: true
    }
  }
}

export const initializeMapFailure = (state, action) => {
  return {
    ...state,
    ...statusReducer('initializeMap', 'FAILURE', state, action.payload.error)
  }
}

export const initializeTilemapDataSegmentRequest = (state, action) => {
  const { segmentId } = action.payload;

  return {
    ...state,
    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        initialized: false,
        loading: true
      }
    }
  }
}

export const initializeTilemapDataSegmentSuccess = (state, action) => {
  const { segmentId } = action.payload;

  return {
    ...state,
    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        initialized: true,
        loading: false
      }
    }
  }
}

export const initializeTilemapDataSegmentFailure = (state, action) => {
  const { segmentId } = action.payload;

  return {
    ...state,
    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        initialized: false,
        loading: false
      }
    }
  }
}

export const storeMapRequest = (state, action) => {
  return {
    ...state,
    ...statusReducer('storeMap', 'REQUEST', state)
  }
}

export const storeMapSuccess = (state, action) => {
  return {
    ...state,
    ...statusReducer('storeMap', 'SUCCESS', state)
  }
}

export const storeMapFailure = (state, action) => {
  return {
    ...state,
    ...statusReducer('storeMap', 'FAILURE', state, action.payload.error)
  }
}


export const setCurrentScene = (state, action) => {
  const { sceneId } = action.payload;

  return {
    ...state,
    currentScene: {
      ...state.currentScene,
      uid: sceneId,
      initialized: false,
      modified: false
    },
    mapGrid: [],
    segmentProperties: {},
    layerSortOrder: [],
    layerProperties: {},
    tilemapData: {}
  }
};

export const setMapProperties = (state, action) => {
  return {
    ...state,
    mapProperties: {
      ...action.payload.mapProperties
    }
  }
};

export const setMapGrid = (state, action) => {
  return {
    ...state,
    mapGrid: [
      ...action.payload.mapGrid
    ]
  }
};

export const setLayerPropertiesById = (state, action) => {
  const { layerId, layerType, name, tileSize, visible } = action.payload;



  return {
    ...state,
    meta: {
      ...state.meta,
      createdLayers: {
        ...state.meta.createdLayers,
        [layerType]: state.meta.createdLayers[layerType] + 1
      }
    },
    layerProperties: {
      ...state.layerProperties,
      [layerId]: {
        ...state.layerProperties[layerId],
        type: layerType,
        name: name || `${layerConstants[layerType].defaultNewLayerName}${state.meta.createdLayers[layerType]}`,
        tileSize,
        visible
      }
    }
  }
}

export const deleteLayerPropertiesById = (state, action) => {
  const { layerId } = action.payload;

  return {
    ...state,
    layerProperties: {
      ...Object.entries(state.layerProperties)
        .reduce((obj, [key, value]) => {
          if (key !== layerId) {
            obj = { ...obj, [key]: value }
          }

          return obj;
        }, {})
    }
  }
}

export const removeEntryFromObject = (objectToRemoveFrom, objectKeyToRemove) => ({
  ...Object.entries(objectToRemoveFrom)
    .reduce((obj, [key, value]) => {
      if (key !== objectKeyToRemove) {
        obj = { ...obj, [key]: value }
      }

      return obj;
    }, {})
});

export const setLayerSortOrder = (state, action) => {
  const { layerSortOrder } = action.payload;

  return {
    ...state,
    layerSortOrder
  }
}

export const setActiveLayer = (state, action) => {
  const { layerId } = action.payload;

  return {
    ...state,
    activeLayerId: layerId
  }
};

export const toggleLayerVisibility = (state, action) => {
  const { layerId } = action.payload;

  return {
    ...state,
    layerProperties: {
      ...state.layerProperties,
      [layerId]: {
        ...state.layerProperties[layerId],
        visible: !state.layerProperties[layerId].visible
      }
    }
  }
};

export const setTilemapDataObject = (state, action) => {
  const { tilemapDataObject } = action.payload;

  return {
    ...state,
    tilemapData: tilemapDataObject,
    segmentProperties: {
      ...state.segmentProperties,
      ...Object.keys(tilemapDataObject).reduce((obj, segmentId) => {
        return obj = {
          ...obj,
          [segmentId]: {
            ...state.segmentProperties[segmentId],
            firestore: true
          }
        }
      }, {})
    }
    // foreach segment set properties @ save flag
  }
};

export const addLayerToTilemapDataSegment = (state, action) => {
  const { segmentId, layerId, tilemapData } = action.payload;

  return {
    ...state,
    tilemapData: {
      ...state.tilemapData,
      [segmentId]: {
        ...state.tilemapData[segmentId],
        [layerId]: tilemapData
      }
    }
  }
};

export const removeLayerFromTilemapDataSegment = (state, action) => {
  const { segmentId, layerId } = action.payload;

  return {
    ...state,
    tilemapData: {
      ...state.tilemapData,
      [segmentId]: {
        ...Object.entries(state.tilemapData[segmentId])
          .reduce((obj, [key, value]) => {
            if (key !== layerId) {
              obj = { ...obj, [key]: value }
            }

            return obj;
          }, {})
      }
    }
  }
};

export const setStatusMessage = (state, action) => {
  const { header, content } = action.payload;

  return {
    ...state,
    statusMessage: {
      header,
      content
    }
  }
};

export const setSingleTileValue = (state, action) => {
  const { segmentId, layerId, columnIndex, rowIndex, value } = action.payload;

  return {
    ...state,

    currentScene: {
      ...state.currentScene,
      modified: true
    },

    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        modified: true
      }
    },

    tilemapData: {
      ...state.tilemapData,
      [segmentId]: {
        ...state.tilemapData[segmentId],
        [layerId]: Object.assign([ ...state.tilemapData[segmentId][layerId] ], {
          [columnIndex]: Object.assign( [...state.tilemapData[segmentId][layerId][columnIndex]], {
            [rowIndex]: value
          })
        })
      }
    }
  }
}

export const clearSingleTileValue = (state, action) => {
  const { segmentId, layerId, columnIndex, rowIndex } = action.payload;

  return {
    ...state,

    currentScene: {
      ...state.currentScene,
      modified: true
    },

    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        modified: true
      }
    },

    tilemapData: {
      ...state.tilemapData,
      [segmentId]: {
        ...state.tilemapData[segmentId],
        [layerId]: Object.assign([ ...state.tilemapData[segmentId][layerId] ], {
          [columnIndex]: Object.assign( [...state.tilemapData[segmentId][layerId][columnIndex]], {
            [rowIndex]: 0
          })
        })
      }
    }
  }
}

import { statusReducer } from 'state/lib/utils';

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

export const initializeTilemapDataBySegmentIdRequest = (state, action) => {
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

export const initializeTilemapDataBySegmentIdSuccess = (state, action) => {
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

export const initializeTilemapDataBySegmentIdFailure = (state, action) => {
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
    }
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

export const setTilemapDataObject = (state, action) => {
  return {
    ...state,
    tilemapData: action.payload.tilemapDataObject

  }
};

export const setTilemapDataBySegmentId = (state, action) => {
  const { segmentId, tilemapData } = action.payload;

  return {
    ...state,
    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        initialized: true
      }
    },

    tilemapData: {
      ...state.tilemapData,
      [segmentId]: tilemapData
    }
  }
}

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
    // segmentProperties: {
    //   ...state.segmentProperties,
    //   [segmentId]: {
    //     ...state.segmentProperties[segmentId],
    //     modified: true
    //   }
    // },

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

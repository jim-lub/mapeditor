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
    ...statusReducer('initializeMap', 'SUCCESS', state)
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

export const setSingleTileValue = (state, action) => {
  const { segmentId, layerId, columnIndex, rowIndex, value } = action.payload;

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

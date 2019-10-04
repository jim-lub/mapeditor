import { deleteKeyValuePairFromObject } from 'state/lib/utils/deleteKeyValuePairFromObject';

export const setTilemapDataObject = (state, action) => {
  const { tilemapDataObject } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...tilemapDataObject
    }
  }
}

export const clearTilemapDataObject = (state, action) => {
  return {
    ...state,
    tilemapDataObject: {}
  }
}

export const setTilemapDataSegment = (state, action) => {
  const { segmentId, tilemapData } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: tilemapData
    }
  }
}

export const clearTilemapDataSegment = (state, action) => {
  const { segmentId } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...deleteKeyValuePairFromObject(
        state.tilemapDataObject,
        segmentId
      )
    }
  }
}

export const addLayerToTilemapDataSegment = (state, action) => {
  const { segmentId, layerId, tilemapData } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...state.tilemapDataObject[segmentId],
        [layerId]: tilemapData
      }
    }
  }
}

export const removeLayerFromTilemapDataSegment = (state, action) => {
  const { segmentId, layerId } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...deleteKeyValuePairFromObject(
          state.tilemapDataObject[segmentId],
          layerId
        )
      }
    }
  }
}

export const setSingleTileValue = (state, action) => {
  const { segmentId, layerId, columnIndex, rowIndex, value } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...state.tilemapDataObject[segmentId],
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
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...state.tilemapDataObject[segmentId],
        [layerId]: Object.assign([ ...state.tilemapData[segmentId][layerId] ], {
          [columnIndex]: Object.assign( [...state.tilemapData[segmentId][layerId][columnIndex]], {
            [rowIndex]: 0
          })
        })
      }
    }
  }
}

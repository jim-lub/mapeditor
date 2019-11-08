import _ from 'lodash';

import { deleteKeyValuePairFromObject } from 'state/lib/utils';

export const setTilemapDataObject = (state, action) => {
  const { tilemapDataObject } = action.payload;

  return {
    ...state,
    segmentProperties: {
      ...tilemapDataObject.reduce((obj, data) => {
        const [segmentId] = Object.keys(data);

        return obj = {
          ...obj,
          [segmentId]: {
            includeFirestore: true,
            modified: false
          }
        }
      }, {})
    },
    tilemapDataObject: {
      ...tilemapDataObject.reduce((obj, tilemapData) => {
        return obj = {
          ...obj,
          ...tilemapData
        }
      }, {})
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
  const { segmentId, layerId, tilemapDataSegmentLayer } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...state.tilemapDataObject[segmentId],
        [layerId]: tilemapDataSegmentLayer
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
    segmentProperties: {
      ...state.segmentProperties,
      [segmentId]: {
        ...state.segmentProperties[segmentId],
        modified: true
      }
    },
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...state.tilemapDataObject[segmentId],
        [layerId]: Object.assign([ ...state.tilemapDataObject[segmentId][layerId] ], {
          [columnIndex]: Object.assign( [...state.tilemapDataObject[segmentId][layerId][columnIndex]], {
            [rowIndex]: value
          })
        })
      }
    }
  }
}

export const setMultipleTileValues = (state, action) => {
  const { list, segmentIDs, layerId } = action.payload;

  return {
    ...state,
    tilemapDataObject: {
      ...state.tilemapDataObject,
      ...segmentIDs.reduce((obj, segmentId) => ({
        ...obj,
        [segmentId]: {
          ...state.tilemapDataObject[segmentId],
          [layerId]: [
            ...state.tilemapDataObject[segmentId][layerId]
              .map((column, columnIndex) => column
                .map((currentValue, rowIndex) => {
                  const listValue = _.find(list, { segmentId, columnIndex, rowIndex });

                  if (listValue) return listValue.value;

                  return currentValue;
                })
              )
          ]
        }
      }), {})
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
    tilemapDataObject: {
      ...state.tilemapDataObject,
      [segmentId]: {
        ...state.tilemapDataObject[segmentId],
        [layerId]: Object.assign([ ...state.tilemapDataObject[segmentId][layerId] ], {
          [columnIndex]: Object.assign( [...state.tilemapDataObject[segmentId][layerId][columnIndex]], {
            [rowIndex]: 0
          })
        })
      }
    }
  }
}

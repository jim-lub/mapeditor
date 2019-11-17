import _ from 'lodash';
import { deleteKeyValuePairFromObject } from 'state/lib/utils';

export const initializeStore = (state, action) => {
  const { tilemapDataObject } = action.payload;

  return {
    ...state,
    properties: {
      ...tilemapDataObject.reduce((obj, tilemapData) => {
        const [segmentId] = Object.keys(tilemapData);

        obj = {
          ...obj,
          [segmentId]: {
            includeFirestore: true,
            modified: false
          }
        }

        return obj;
      }, {})
    },
    tilemapData: {
      ...tilemapDataObject.reduce((obj, tilemapData) => {
        obj = {
          ...obj,
          ...tilemapData
        }

        return obj;
      }, {})
    }
  }
}

export const clearStore = (state, action) => {
  return {
    ...state,
    properties: {},
    tilemapData: {}
  }
}

export const setTilemapData = (state, action) => {
  const { segmentId, tilemapData } = action.payload;

  return {
    ...state,
    tilemapData: {
      ...state.tilemapData,
      [segmentId]: tilemapData
    }
  }
}

export const clearTilemapData = (state, action) => {
  const { segmentId } = action.payload;

  return {
    ...state,
    tilemapData: {
      ...deleteKeyValuePairFromObject(
        state.tilemapData,
        segmentId
      )
    }
  }
}

export const setTileValues = (state, action) => {
  const { segmentIDs, layerId, list } = action.payload;

  return {
    ...state,
    tilemapData: {
      ...state.tilemapData,

      ...segmentIDs.reduce((obj, segmentId) => {
        if (!state.tilemapData.hasOwnProperty(segmentId)) return obj;
        if (!state.tilemapData[segmentId].hasOwnProperty(layerId)) return obj;

        return {
          ...obj,
          [segmentId]: {
            ...state.tilemapData[segmentId],
            [layerId]:
              state.tilemapData[segmentId][layerId]
                .map((column, tilemapColumnIndex) =>
                  column.map((currentValue, tilemapRowIndex) => {
                    const update = _.find(list, { segmentId, tilemapColumnIndex, tilemapRowIndex });

                    return (update)
                      ? update.value
                      : currentValue
                  })
                )
          }
        }
      }, {})
    }

  }
}

export const clearTileValues = (state, action) => {
  const { segmentIDs, layerId, list } = action.payload;

  return {
    ...state,
    tilemapData: {
      ...state.tilemapData,

      ...segmentIDs.reduce((obj, segmentId) => {
        if (!state.tilemapData.hasOwnProperty(segmentId)) return obj;
        if (!state.tilemapData[segmentId].hasOwnProperty(layerId)) return obj;

        return {
          ...obj,
          [segmentId]: {
            ...state.tilemapData[segmentId],
            [layerId]:
              state.tilemapData[segmentId][layerId]
                .map((column, tilemapColumnIndex) =>
                  column.map((currentValue, tilemapRowIndex) => {
                    const update = _.find(list, { segmentId, tilemapColumnIndex, tilemapRowIndex });
                    
                    return (update)
                      ? 0
                      : currentValue
                  })
                )
          }
        }
      }, {})
    }

  }
}

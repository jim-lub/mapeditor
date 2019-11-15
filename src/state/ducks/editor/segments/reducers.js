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

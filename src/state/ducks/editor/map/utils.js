import * as actions from './actions';
import * as selectors from './selectors';

import * as mapConstants from 'lib/constants/mapConstants';

import * as tilemapDataUtils from 'lib/editor/tilemap-data-utils';
import {
  uuid,
  buildTwoDimensionalArray
} from 'lib/utils';

export const buildMapGrid = ({ mapProperties: { mapSize }, firestoreMapGrid }) => (
  buildTwoDimensionalArray({
    columns: mapSize.columns,
    rows: mapSize.rows,
    mapFn: ({ columnIndex, rowIndex }) => {

      if (firestoreMapGrid[columnIndex]) {
        if (firestoreMapGrid[columnIndex][rowIndex]) {
          return firestoreMapGrid[columnIndex][rowIndex];
        }
      }

      return uuid.create();
    }
  })
)

export const convertMapGridToDataChunks = ({ mapProperties: { mapSize }, mapGrid }) => {
  const MAX_COLUMNS_PER_CHUNK = 20;
  const chunks = Math.ceil( mapSize.columns / MAX_COLUMNS_PER_CHUNK );

  return [...new Array(chunks)].map((val, index) => {
    const indexStart = index * MAX_COLUMNS_PER_CHUNK;
    const indexEnd = (index + 1) * MAX_COLUMNS_PER_CHUNK;

    return JSON.stringify( mapGrid.slice(indexStart, indexEnd) )
  })
}

export const convertDataChunksToMapGrid = ({ dataChunks = [] }) => (
  dataChunks
    .map(dataChunk => JSON.parse(dataChunk))
    .reduce((mapGrid, dataChunk) => mapGrid.concat( dataChunk ), [])
)


export const validateTilemapDataBySegmentId = ({ segmentId }) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let isModified = false;
    const state = getState();

    const { segmentSize } = selectors.getMapProperties(state);
    const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId });
    const layerSortOrder = selectors.getLayerSortOrder(state);

    layerSortOrder.forEach(layerId => {
      if (tilemapData[layerId]) {
        /*
          validate tiles; if columns and row match return else error
        */
        return;
      }

      const { tileSize } = selectors.getLayerPropertiesById(state, { layerId });
      tilemapData[layerId] = tilemapDataUtils.buildTilemapDataArray({ segmentSize, tileSize });
      isModified = true;
    });

    if (isModified) {
      dispatch( actions.setTilemapDataBySegmentId({ segmentId, tilemapData }))
    }

    resolve()
  });
}

export const buildTilemapDataSegment = () => (dispatch, getState) => {
  const state = getState();
  const { segmentSize } = selectors.getMapProperties(state);
  const layerSortOrder = selectors.getLayerSortOrder(state);

  return layerSortOrder.reduce((obj, layerId) => ({
    ...obj,
    [layerId]: buildTwoDimensionalArray({
      columns: segmentSize.width / selectors.getLayerPropertiesById(state, { layerId }).tileSize.width,
      rows: segmentSize.height / selectors.getLayerPropertiesById(state, { layerId }).tileSize.height,
      mapFn: () => {
        return 0
      }
    })
  }), {});
}

export const convertTilemapDataToDataChunks = ({ tilemapData }) => async (dispatch) => {
  const toJSON = (obj) => JSON.stringify(obj);

  const calculateTilemapDataMemorySize = async (data) => Promise.all(
    Object.entries(data)
      .map(([key, value]) => ({
        obj: {
          [key]: value
        },
        memorySize: memorySizeOf( toJSON({ [key]: value }), 'KiB' )
      }))
    )

  const reduceTilemapDataToChunks = async (data) => {
    let accumulatorKiB = 0, accumulatorDataChunks = [];

    return data.reduce((dataChunksArray, segmentData, index) => {
      const { obj, memorySize } = segmentData;
      const isLastSegmentInArray = ((data.length - 1 ) === index);

      if ((accumulatorKiB + memorySize) < mapConstants.MAX_TILEMAP_DATA_CHUNK_SIZE) {
        accumulatorKiB += memorySize;
        dataChunksArray = [...dataChunksArray];
        accumulatorDataChunks.push(obj);
      }

      if ((accumulatorKiB + memorySize) > mapConstants.MAX_TILEMAP_DATA_CHUNK_SIZE || isLastSegmentInArray) {
        accumulatorKiB = 0;
        dataChunksArray = [...dataChunksArray, JSON.stringify(accumulatorDataChunks)];
        accumulatorDataChunks = [];
      }

      return dataChunksArray;
    }, [])
  }

  const tilemapDataWithMemorySizes = await calculateTilemapDataMemorySize(tilemapData);

  return await reduceTilemapDataToChunks(tilemapDataWithMemorySizes);;
}

export const convertDataChunksToTilemapData = ({ dataChunks = [] }) => (
  dataChunks
    .map(dataChunk => JSON.parse(dataChunk))
    .reduce((mapGrid, dataChunk) => mapGrid.concat( dataChunk ), [])
)

export const memorySizeOf = (obj, unit) => {
  let bytes = 0;

  const sizeOf = (obj) => {
    if (obj !== null && obj !== undefined) {
      switch(typeof obj) {
        case 'number':
          return bytes += 8;
        case 'string':
          return bytes += obj.length * 2;
        case 'boolean':
          return bytes += 4;
        case 'object':
          let objClass = Object.prototype.toString.call(obj).slice(8, -1);

          if (objClass === 'Object' || objClass === 'Array') {
            for (let key in obj) {
              if (!obj.hasOwnProperty(key)) continue;
              sizeOf(obj[key]);
            }
          } else {
            bytes += obj.toString().length * 2;
          }
          break;
        default:
          return;
      }
    }
  }

  const bytesToKiB = (bytes) => (bytes / 1024);
  const bytesToMiB = (bytes) => (bytes / 1048576);
  const bytesToGiB = (bytes) => (bytes / 1073741824);

  const formatByteSize = (bytes) => {
    if (bytes < 1024) return { value: bytes, suffix: "bytes"}
    if (bytes < 1048576) return { value: (bytes / 1024), suffix: "KiB"}
    if (bytes < 1073741824) return { value: (bytes / 1048576), suffix: "MiB"}
    return { value: (bytes / 1073741824), suffix: "GiB"}
  }

  if (unit === 'byte') {
    return sizeOf(obj);
  }

  if (unit === 'KiB') {
    return bytesToKiB( sizeOf(obj) );
  }

  if (unit === 'MiB') {
    return bytesToMiB( sizeOf(obj) );
  }

  if (unit === 'GiB') {
    return bytesToGiB( sizeOf(obj) );
  }

  return formatByteSize( sizeOf(obj) );
}

export const inputModifiersObjectMatches = (inputModifiersObject, modifierKeys = []) => {
  const activeKeys = Object.entries(inputModifiersObject)
    .filter(([modifierKey, value]) => value)
    .map(([modifierKey, value]) => modifierKey);

  if (activeKeys.length !== modifierKeys.length) return false;
  if (activeKeys.length === 0 && modifierKeys.length === 0) return true;

  return modifierKeys.every(modifierKey => activeKeys.includes(modifierKey));
}

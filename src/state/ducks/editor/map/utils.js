import * as mapConstants from 'lib/constants/mapConstants';

import {
  uuid,
  buildTwoDimensionalArray
} from 'lib/utils';

export const buildMapGrid = ({ mapSize }) => {
  return buildTwoDimensionalArray({
    columns: mapSize.columns,
    rows: mapSize.rows,
    mapFn: () => uuid.create()
  })
}

export const convertTilemapDataToDataChunks = ({ tilemapDataObject }) => async (dispatch, getState) => {
  const toJSON = (obj) => JSON.stringify(obj);

  // lower writes by excluding empty segments
  const removeEmptyTilemapDataSegments = async (data) => Promise.all(
    Object.entries(data)
      .filter(([segmentId, data]) => {
        return true;
        /*
        * ONLY INCLUDE SEGMENTS THAT ARE MODIFIED!!!!
        *
        */
        // const segmentProperties = selectors.getSegmentPropertiesById(getState(), { segmentId });
        //
        // return (segmentProperties.modified || segmentProperties.firestore);
      })
    )

  // estimate memory size to determine how many "data chunks" are needed
  const calculateTilemapDataMemorySize = async (data) => Promise.all(
    data.map(([key, value]) => ({
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

  const tilemapDataWithEmptySegmentsRemoved = await removeEmptyTilemapDataSegments(tilemapDataObject);
  const tilemapDataWithMemorySizes = await calculateTilemapDataMemorySize(tilemapDataWithEmptySegmentsRemoved);

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
